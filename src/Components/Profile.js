import { useState, useEffect, useContext } from "react";
import UserContext from "../Contexts/user-context";
import { useNavigate, useParams } from "react-router-dom";

import Header from "./Header";
import "./Profile.css";

const Profile = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const { ownerId } = useParams();

  const my = userCtx.user;

  const [enteredName, setEnteredName] = useState(my.store_name);
  const [enteredDesc, setEnteredDesc] = useState(my.store_description);

  useEffect(()=> {
    setEnteredName(my.store_name);
    setEnteredDesc(my.store_description);
  },[])

  // const resetEntered = () => {
  //   setEnteredName("");
  //   setEnteredDesc("");
  // };

  const submitHandler = async () => {
    await userCtx.onEditProfile(enteredName, enteredDesc);
    // resetEntered();
    // navigate(`/stores/${ownerId}`);
    navigate(-1);
    userCtx.fetchMyProfile();
  };

  const cancelHandler = () => {
    // resetEntered();
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className="full">
        <div className="profileCon">
          <h3 className="title">내 정보 수정</h3>

          <label className="inputLabel">가게 이름</label>
          <input
            className="inputBox"
            type="text"
            minLength="1"
            maxLength="20"
            placeholder="가게 이름을 적어주세요"
            value={enteredName}
            onChange={(e) => setEnteredName(e.target.value)}
          />

          <label className="inputLabel">가게 설명</label>
          <textarea
            className="inputBoxDesc"
            type="text"
            placeholder="가게에 대해 설명해주세요"
            value={enteredDesc}
            onChange={(e) => setEnteredDesc(e.target.value)}
          />

          <div className="buttonCon">
            <button className="greenButton" onClick={submitHandler}>
              저장
            </button>
            <button className="button" onClick={cancelHandler}>
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
