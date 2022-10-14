import { createContext, useState } from "react";
import { getCookie, setCookies } from "../utils/cookie";

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  onLogin: (userId, userPassword) => {},
  onLogout: () => {},
});

export const UserContextProvider = (props) => {
  // user = 로그인한 유저 아이디
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (id) => {
    setUser(id)
    setIsLoggedIn(true);
    setCookies('user', user);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
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
