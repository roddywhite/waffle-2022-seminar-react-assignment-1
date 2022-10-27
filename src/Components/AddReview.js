import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./AddReview.css";
import starEmpty from "../assets/starEmpty.svg";
import starFull from "../assets/starFull.svg";
import UserContext from "../Contexts/user-context";

const AddReview = ({ menuId, fetchReviewData }) => {
  const [enteredContent, setEnteredContent] = useState("");
  const [enteredRating, setEnteredRating] = useState(0);
  const userCtx = useContext(UserContext);
  const { authAxios } = userCtx;
  const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";
  const errMsg = (text) => toast.error(text, { theme: "colored" });
  const successMsg = (text) => toast.success(text, { theme: "colored" });

  const submitHandler = () => {
    if (!userCtx.isLoggedIn) {
      errMsg("로그인 해주세요");
    } else if (enteredRating < 1) {
      errMsg("별점을 체크해주세요");
    } else {
      authAxios
        .post(`${end}/reviews`, {
          content: enteredContent,
          rating: enteredRating,
          menu: menuId,
        })
        .then((res) => {
          fetchReviewData();
          setEnteredContent("");
          setEnteredRating(0);
          successMsg("리뷰가 등록되었습니다")
        })
        .catch((res) => {
          errMsg(res.response.data.message);
        });
    }
  };
  return (
    <div className="addReviewSection">
      <ToastContainer autoClose={3000} position="top-center" pauseOnHover />
      <div className="starBox">
        <img
          className="star"
          src={enteredRating >= 1 ? starFull : starEmpty}
          onClick={() => setEnteredRating(1)}
        />
        <img
          className="star"
          src={enteredRating >= 2 ? starFull : starEmpty}
          onClick={() => setEnteredRating(2)}
        />
        <img
          className="star"
          src={enteredRating >= 3 ? starFull : starEmpty}
          onClick={() => setEnteredRating(3)}
        />
        <img
          className="star"
          src={enteredRating >= 4 ? starFull : starEmpty}
          onClick={() => setEnteredRating(4)}
        />
        <img
          className="star"
          src={enteredRating >= 5 ? starFull : starEmpty}
          onClick={() => setEnteredRating(5)}
        />
      </div>
      <textarea
        className="addReviewContainer"
        placeholder="리뷰를 입력하세요"
        value={enteredContent}
        onChange={(e) => setEnteredContent(e.target.value)}
      />
      <button className="greenBtn" onClick={submitHandler}>
        저장
      </button>
    </div>
  );
};

export default AddReview;
