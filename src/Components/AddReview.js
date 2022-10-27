import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./AddReview.css";
import starEmpty from "../assets/starEmpty.svg";
import starHalf from "../assets/starHalf.svg";
import starFull from "../assets/starFull.svg";
import UserContext from "../Contexts/user-context";

const AddReview = ({ menuId, fetchReviewData, fetchFirstReviews}) => {
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
          fetchFirstReviews();
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
      <ToastContainer autoClose={3000} position="top-right" pauseOnHover />
      <div className="starBox">
      {[1, 2, 3, 4, 5].map((x) => {
              return (
                <img
                  className="star"
                  src={
                    enteredRating < 2 * x - 1
                      ? starEmpty
                      : enteredRating < 2 * x
                      ? starHalf
                      : starFull
                  }
                  onClick={() => setEnteredRating(2 * x)}
                />
              );
            })}
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
