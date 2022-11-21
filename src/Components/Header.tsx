import "./Header.scss";
import logo from "../assets/logo.svg";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/user-context";

const Header = () => {
  const userCtx = useContext(UserContext);
  const {
    user,
    isLoggedIn,
    onLogout,
  }: { user: user | null; isLoggedIn: boolean; onLogout: () => void } = userCtx;

  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="waffle logo" />
      </Link>
      <Link to="/">
        <a className="title" target="_blank">
          <h1>와플스튜디오 메뉴 관리</h1>
        </a>
      </Link>
      {!isLoggedIn ? (
        <Link to="/login" className="logoutBox">
          <button className="login">로그인</button>
        </Link>
      ) : (
        <div className="logoutBox">
          <a>{user!?.username}님 환영합니다!</a>
          <Link to={`/stores/${user!?.id}`}>
            <button className="market">내 가게</button>
          </Link>
          <Link to={`/profile/${user!?.id}`}>
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

export default Header;
