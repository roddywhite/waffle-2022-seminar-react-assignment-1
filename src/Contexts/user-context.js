import { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  token: "",
  onLogin: (userId, userPassword) => {},
  onLogout: () => {},
  onEditProfile: () => {},
  onAddMenu: () => {},
  onEditMenu: () => {},
  onDeleteMenu: () => {},
  onAddReview: () => {},
  onEditReview: () => {},
  onDeleteReview: () => {},
  testtest: () => {},
});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";

  const loginHandler = async (userName, userPassword) => {
    try {
      axios
        .post(`${end}/auth/login`, {
          username: userName,
          password: userPassword,
        })
        .then((res) => {
          console.log(res);
          setIsLoggedIn(true);
          setToken(res.data.access_token);
        });
    } catch (err) {
      console.log("로그인 실패" + err);
    }
  };

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const logoutHandler = () => {
    authAxios.post(`${end}/auth/logout`).then((res) => {
      setIsLoggedIn(false);
      setToken('');
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

  const editProfileHandler = (storeName, storeDesc) => {
    authAxios
      .patch(`${end}/owners/me`, {
        store_name: storeName,
        store_description: storeDesc,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const testHandler = () => {
    axios.get(`${end}/reviews/?menu=9`).then((res) => {
      console.log(res.data.data);
    });
  };

  const addReviewHandler = (content, rating, menuId) => {
    authAxios
      .post(`${end}/reviews`, {
        content: content,
        rating: rating,
        menu: menuId,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const editReviewHandler = (reviewId, content, rating) => {
    authAxios
      .patch(`${end}/reviews/${reviewId}`, {
        content: content,
        rating: rating,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const deleteReviewHandler = (reviewId) => {
    authAxios.delete(`${end}/menus/${reviewId}`).then((res) => {
      console.log(res);
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        isLoggedIn: isLoggedIn,
        token: token,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onEditProfile: editProfileHandler,
        onAddMenu: addMenuHandler,
        onEditMenu: editMenuHandler,
        onDeleteMenu: deleteMenuHandler,
        onAddReview: addReviewHandler,
        onEditReview: editReviewHandler,
        onDeleteReview: deleteReviewHandler,
        testtest: testHandler,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
