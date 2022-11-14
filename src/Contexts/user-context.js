import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { end, errMsg, successMsg } from "../utils/common";

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  token: "",
  userPW: "",
  authAxios: () => {},
  onLogin: (userId, userPassword) => {},
  onLogout: () => {},
  fetchMyProfile: () => {},
});

export const UserContextProvider = (props) => {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userPW, setUserPW] = useState("");

  const loginHandler = async (userName, userPassword) => {
    axios
      .post(
        `${end}/auth/login`,
        {
          username: userName,
          password: userPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setIsLoggedIn(true);
        setToken(res.data.access_token);
        setUserPW(userPassword);
        navigate(-1);
      })
      .catch((res) => {
        errMsg(res.response.data.message);
      });
  };

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const logoutHandler = () => {
    authAxios
      .post(`${end}/auth/logout`, null, { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(false);
        setToken("");
        setUser(null);
      });
  };

  const fetchMyProfile = () => {
    try {
      authAxios.get(`${end}/owners/me`).then((res) => {
        setUser(res.data.owner);
      });
    } catch (err) {
      console.log("로그인 필요" + err);
    }
  };
  useEffect(() => {
    fetchMyProfile();
  }, [isLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        user: user,
        isLoggedIn: isLoggedIn,
        token: token,
        userPW: userPW,
        authAxios: authAxios,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        fetchMyProfile: fetchMyProfile,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
