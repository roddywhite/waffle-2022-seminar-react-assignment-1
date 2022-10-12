import { createContext, useState } from "react";

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  //IDE 자동완성때문에 dummy 함수 추가해준 것
  onLogin: (userId, userPassword) => {},
  onLogout: () => {},
});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (userId, userPassword) => {
    setIsLoggedIn(true);
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
