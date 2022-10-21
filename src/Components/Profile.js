import { useState, useEffect, useContext } from "react";
import UserContext from "../Contexts/user-context";
import MenuContext from "../Contexts/menu-context";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import Header from "./Header";
import './addMenu.css';
import axios from "axios";

const Profile = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const {ownerId} = useParams();

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");

  const submitHandler = () => {

    axios.patch('')
    
    navigate(`/stores/${ownerId}`)
  }

  return (
    <>
      <Header />
      <div className="full">
        <div className="addContainer">
          <h3 className="title">내 정보 수정</h3>

          <label className="inputLabel">가게 이름</label>
          <input
            className="inputBox"
            type="text"
            minLength="1"
            maxLength="20"
            placeholder="가게 이름을 적어주세요"
            value={enteredTitle}
            onChange={(e) => setEnteredTitle(e.target.value)}
          />

          <label className="inputLabel">가게 설명</label>
          <input
            className="inputBoxDesc"
            type="text"
            placeholder="가게에 대해 설명해주세요"
            value={enteredDesc}
            onChange={(e) => setEnteredDesc(e.target.value)}
          />

          <div className="buttonCon">
            <button className="greenButton" onClick={submitHandler}>
              추가
            </button>
            <button className="button" onClick={cancelHandler}>
              취소
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

