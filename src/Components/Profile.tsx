import { useState, useEffect, useContext } from "react";
import UserContext from "../Contexts/user-context";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { end, errMsg, successMsg } from "../utils/common";

import Header from "./Header";
import "./Profile.scss";

const Profile = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const { ownerId } = useParams();
  const { authAxios } = userCtx;
  const my: user | null = userCtx?.user;

  const [enteredName, setEnteredName] = useState(my!?.store_name);
  const [enteredDesc, setEnteredDesc] = useState(my!?.store_description);

  useEffect(() => {
    setEnteredName(my!?.store_name);
    setEnteredDesc(my!?.store_description);
  }, []);

  const submitHandler = async () => {
    if (enteredName === "") {
      errMsg("가게 이름을 입력해주세요");
    } else if (enteredDesc === "") {
      errMsg("가게 설명을 입력해주세요");
    } else {
      authAxios
        .patch(`${end}/owners/me`, {
          store_name: enteredName,
          store_description: enteredDesc,
        })
        .then((res) => {
          userCtx.fetchMyProfile();
          navigate(-1);
        })
        .catch((res) => {
          errMsg(res.response.data.message);
        });
    }
  };
  const cancelHandler = () => {
    // resetEntered();
    navigate(-1);
  };

  useEffect(() => {
    if (!userCtx.isLoggedIn) {
      errMsg("로그인 해주세요");
      setTimeout(() => navigate(-1), 3000);
    } else if ((userCtx.user as user | null)?.id !== Number(ownerId)) {
      errMsg("접근 권한이 없습니다");
      setTimeout(() => navigate(-1), 3000);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="fullfull">
        <div className="profileCon">
          <h3>내 정보 수정</h3>

          <label>가게 이름</label>
          <input
            className="inputBox"
            type="text"
            minLength={1}
            maxLength={20}
            placeholder="가게 이름을 적어주세요"
            value={enteredName}
            onChange={(e) => setEnteredName(e.target.value)}
          />

          <label>가게 설명</label>
          <textarea
            className="inputBoxDesc"
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
