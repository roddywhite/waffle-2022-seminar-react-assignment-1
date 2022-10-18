import "./Header.css";
import logo from "../assets/logo.svg";

import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/user-context";

const Header = () => {
  const userCtx = useContext(UserContext);

  const uri = 'https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com'
  const fetchData = async () => {
    try {
      const response = await axios.get(`${uri}/owners`)
      const userName = response.username
      console.log(response)
      console.log(userName)
    } catch(err) {
      console.log('error' + err)
    }
  }

  useEffect(fetchData,[]);

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
