import "./Header.css";
import logo from "../assets/logo.svg";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/user-context";

const Header = () => {
  const userCtx = useContext(UserContext);

  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="waffle logo" />
      </Link>
      <a className="title" href="https://wafflestudio.com" target="_blank">
        <h1>와플스튜디오 메뉴 관리</h1>
      </a>
      {!userCtx.isLoggedIn ? (
        <Link to="/login" className="logoutBox">
          <button className="login">로그인</button>
        </Link>
      ) : (
        <div className="logoutBox">
          <a>{userCtx.user}님 환영합니다!</a>
          <Link to="/stores/1">
            <button className="market">내 가게</button>
          </Link>
          <button className="logout" onClick={userCtx.onLogout}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
