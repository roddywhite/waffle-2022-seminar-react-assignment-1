import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosInstance } from "axios";
import "react-toastify/dist/ReactToastify.css";
import { end, errMsg, successMsg } from "../utils/common";

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  token: "",
  userPW: "",
  authAxios: axios.create(),
  onLogin: (userId: string, userPW: string) => {},
  onLogout: () => {},
  onRefresh: () => {},
  fetchMyProfile: () => {},
});

export const UserContextProvider = (props: any) => {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userPW, setUserPW] = useState("");

  const loginHandler = async (userName: string, userPassword: string) => {
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

  const authAxios: AxiosInstance = axios.create({
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

  const refreshHandler = (): void => {
    axios
      .post(`${end}/auth/refresh`, null, { withCredentials: true })
      .then((res) => {
        console.log(res.data.access_token);
        setToken(res.data.access_token);
        setIsLoggedIn(true);
      }).catch((res)=>{
        errMsg('error');
      });
  };

  // useEffect(() => {
  //   refreshHandler();
  // }, [token]);

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
        onRefresh: refreshHandler,
        fetchMyProfile: fetchMyProfile,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
