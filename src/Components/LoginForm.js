import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Contexts/user-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";
import "./LoginForm.css";

const LoginForm = () => {
  const userCtx = useContext(UserContext);
  const errMsg = (text) => toast.error(text, { theme: "colored" });
  const successMsg = (text) => toast.success(text, { theme: "colored" });

  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

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
      <div className="full">
        <div className="loginBox">
          <a className="title">로그인</a>
          <div className="leftBox">
            <div className="inputCon">
              <label className="label">ID</label>
              <input
                className="idBox"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="블루베리스무디"
              />
            </div>
            <div className="inputCon">
              <label className="label">PASSWORD</label>
              <input
                className="idBox"
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
