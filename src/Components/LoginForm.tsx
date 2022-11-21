import React, { useState, useContext } from "react";
import UserContext from "../Contexts/user-context";
import "react-toastify/dist/ReactToastify.css";
import { errMsg } from "../utils/common";

import Header from "./Header";
import "./LoginForm.scss";

const LoginForm = () => {
  const userCtx = useContext(UserContext);
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const submitHandler = (): void => {
    if (userId && userPassword) {
      userCtx.onLogin(userId, userPassword);
    } else {
      errMsg("아이디 혹은 패스워드를 확인하세요");
      setUserId("");
      setUserPassword("");
    }
  };

  return (
    <>
      <Header />
      <div className="fullfull">
        <div className="loginBox">
          <a className="title">로그인</a>
          <div>
            <div className="inputCon">
              <label>ID</label>
              <input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="블루베리스무디"
              />
            </div>
            <div className="inputCon">
              <label>PASSWORD</label>
              <input
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="블루베리스무디"
                type="password"
              />
            </div>
          </div>
          <button className="loginButton" onClick={submitHandler}>
            로그인
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
