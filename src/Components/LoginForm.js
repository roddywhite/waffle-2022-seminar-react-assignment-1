import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../Contexts/user-context";

const LoginForm = () => {

  const userCtx = useContext(UserContext);

  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLogIn = ({authenticated, login}) => {
    try {
      login({ userId, userPassword });
    } catch (err) {
      alert("아이디 혹은 패스워드를 확인하세요");
      setUserId("");
      setUserPassword("");
    }
  };

  return (
    <>
      <input
        className="idBox"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="블루베리스무디"
      />
      <input
        className="idBox"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        placeholder="블루베리스무디"
      />
      <button
        className="loginButton"
        onClick={handleLogIn}
      />
    </>
  );
};

export default LoginForm;
