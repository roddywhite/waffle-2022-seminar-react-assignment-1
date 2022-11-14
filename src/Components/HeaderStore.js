
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { end, errMsg, successMsg } from "../utils/common";
import "./HeaderStore.css";
import logo from "../assets/logo.svg";
import UserContext from "../Contexts/user-context";

const HeaderStore = () => {
  const userCtx = useContext(UserContext);
  const { user, isLoggedIn, onLogout } = userCtx;
  const { storeId } = useParams();
  const [storeName, setStoreName] = useState("");
  const [storeOwner, setStoreOwner] = useState("");

  useEffect(() => {
    axios
      .get(`${end}/owners/${storeId}`)
      .then((res) => {
        setStoreName(res.data.owner.store_name);
        setStoreOwner(res.data.owner.username);
      })
      .catch((res) => errMsg(res.response.data.message));
  }, []);

  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="waffle logo" />
      </Link>
      <Link to={`/stores/${storeId}`}>
        <div className="titleContainer" target="_blank">
          <div className="menuManage">
            <a>와플스튜디오 메뉴 관리</a>
          </div>
          <div className="store">
            <a className="storeName">{storeName}</a>
            <div className="owner">
              <a className="ownerName">by {storeOwner}</a>
            </div>
          </div>
        </div>
      </Link>
      {!isLoggedIn ? (
        <Link to="/login" className="logoutBox">
          <button className="login">로그인</button>
        </Link>
      ) : (
        <div className="logoutBox">
          <a>{user?.username}님 환영합니다!</a>
          <Link to={`/stores/${user?.id}`}>
            <button className="market">내 가게</button>
          </Link>
          <Link to={`/profile/${user?.id}`}>
            <button className="profile">내 정보</button>
          </Link>
          <button className="logout" onClick={onLogout}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderStore;
