import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getCookie, setCookies } from "../utils/cookie";

const UserContext = createContext({
  owners: null,
  stores: null,
  user: null,
  isLoggedIn: false,
  token: "",
  owners: null,
  onLogin: (userId, userPassword) => {},
  onLogout: () => {},
  onAddMenu: () => {},
  onDeleteMenu: () => {},
  onEditMenu: () => {},
  testtest: () => {},
});

export const UserContextProvider = (props) => {
  // user = 로그인한 유저 아이디
  const [owners, setOwners] = useState(null);
  const [stores, setStores] = useState(null);
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
      setStores(res.data.filter((owner) => owner.store_name !== undefined));
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

  const addMenuHandler = (newMenu) => {
    authAxios.post(`${end}/menus`, newMenu).then((res) => {
      console.log(res);
    });
  };

  const deleteMenuHandler = (menuId) => {
    authAxios.delete(`${end}/menus/${menuId}`).then((res) => {
      console.log(res);
    });
  };

  const editMenuHandler = (menuId, editedMenu) => {
    authAxios.patch(`${end}/menus/${menuId}`, editedMenu).then((res) => {
      console.log(res);
    });
  };

  const testHandler = () => {
    authAxios
      .patch(`${end}/owners/me`, {
        store_name: "청년 아리랑 와플나라",
        store_description: "맛이 없으면 환불해드립니다",
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <UserContext.Provider
      value={{
        owners: owners,
        stores: stores,
        user: user,
        isLoggedIn: isLoggedIn,
        token: token,
        owners: owners,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onAddMenu: addMenuHandler,
        onDeleteMenu: deleteMenuHandler,
        onEditMenu: editMenuHandler,
        testtest: testHandler,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
