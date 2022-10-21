import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getCookie, setCookies } from "../utils/cookie";

const UserContext = createContext({
  owners: null,
  user: null,
  isLoggedIn: false,
  onLogin: (userId, userPassword) => {},
  onLogout: () => {},
  testtest: () => {},
});

export const UserContextProvider = (props) => {
  // user = 로그인한 유저 아이디
  const [owners, setOwners] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rating, setRating] = useState(0);
  const [token, setToken] = useState("");

  const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";

  const fetchOwnersData = async () => {
    try {
      const res = await axios.get(`${end}/owners`);
      setOwners(res.data);
      console.log(res.data);
    } catch (err) {
      console.log("error!!!" + err);
    }
  };
  useEffect(() => {
    fetchOwnersData();
  }, [isLoggedIn]);

  const loginHandler = async (userId, userPassword) => {
    axios
      .post(`${end}/auth/login`, {
        username: userId,
        password: userPassword,
      })
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true);
        setUser(res.data.owner.username);
        setToken(res.data.access_token);
      });
  };

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const logoutHandler = () => {
    authAxios.post(`${end}/auth/logout`).then((res) => {
      setIsLoggedIn(false);
    });
  };

  const testHandler = () => {
    authAxios
      .post(`${end}/menus`, {
        name: "초생와",
        type: "waffle",
        price: 9000,
        image: "https://example.com/foo.png",
        description: "맛있네",
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <UserContext.Provider
      value={{
        owners: owners,
        user: user,
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        testtest: testHandler,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
