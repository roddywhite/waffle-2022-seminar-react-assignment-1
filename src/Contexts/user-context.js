import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getCookie, setCookies } from "../utils/cookie";

const UserContext = createContext({
  owners: null,
  user: null,
  isLoggedIn: false,
  onLogin: (userId, userPassword) => {},
  onLogout: () => {},
});

export const UserContextProvider = (props) => {
  // user = 로그인한 유저 아이디
  const [owners, setOwners] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rating, setRating] = useState(0);

  const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";

  const fetchOwnersData = async () => {
    try {
      const response = await axios.get(`${end}/owners`);
      setOwners(response.data);
      console.log(response.data);
    } catch (err) {
      console.log("error!!!" + err);
    }
  };
  useEffect(() => {
    fetchOwnersData();
  }, []);

  const loginHandler = async (userId, userPassword) => {
    try {
      const response = await axios.post(`${end}/auth/login`, {
        username: userId,
        password: userPassword,
      });
      setUser(response.owner);
      setIsLoggedIn(true);
    } catch (err) {
      console.log("login error");
    }
  };

  const logoutHandler = () => {
    setIsLoggedIn(null);
  };

  return (
    <UserContext.Provider
      value={{
        owners: owners,
        user: user,
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
