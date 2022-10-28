import { useState, useContext, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./AddReview.css";
import starEmpty from "../assets/starEmpty.svg";
import starHalf from "../assets/starHalf.svg";
import starFull from "../assets/starFull.svg";
import UserContext from "../Contexts/user-context";

const AddReview = ({ menuId, fetchReviewData, fetchFirstReviews }) => {
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
          successMsg("리뷰가 등록되었습니다");
        })
        .catch((res) => {
          errMsg(res.response.data.message);
        });
    }
  };

  // starChangeMode state를 만들어서 별점을 클릭하고 빠져나가려고 마우스오버만 해도 클릭한 별점이 바뀌는 문제 해결
  const [viewRating, setViewRating] = useState(0);
  const [starChangeMode, setStarChangeMode] = useState(false);

  return (
    <div className="addReviewSection">
      <ToastContainer autoClose={3000} position="top-right" pauseOnHover />
      <div
        className="starBox"
        onMouseEnter={() => setStarChangeMode(true)}
        onMouseLeave={() => setStarChangeMode(false)}
      >
        {[1, 2, 3, 4, 5].map((x) => {
          return (
            <img
              className="star"
              src={
                !starChangeMode
                  ? enteredRating < 2 * x - 1
                    ? starEmpty
                    : enteredRating < 2 * x
                    ? starHalf
                    : starFull
                  : viewRating < 2 * x - 1
                  ? starEmpty
                  : viewRating < 2 * x
                  ? starHalf
                  : starFull
              }
              onClick={(e) =>
                e.clientX - e.target.getBoundingClientRect().left < 10
                  ? setEnteredRating(2 * x - 1)
                  : setEnteredRating(2 * x)
              }
              onMouseEnter={(e) =>
                e.clientX - e.target.getBoundingClientRect().left < 10
                  ? setViewRating(2 * x - 1)
                  : setViewRating(2 * x)
              }
            />
          );
        })}

        {/* <img
          className="star"
          ref={star1}
          src={
            e.clientX - e.target.getBoundingClientRect().left < 10
              ? starFull
              : e.clientX - e.target.getBoundingClientRect().left < 20
              ? starHalf
              : starEmpty
          }
        />
        <img className="star" ref={star2} src={starEmpty} />
        <img className="star" ref={star3} src={starEmpty} />
        <img className="star" ref={star4} src={starEmpty} />
        <img className="star" ref={star5} src={starEmpty} /> */}
        {/* {[1, 2, 3, 4, 5].map((x) => {
          return (
            <img
              className="star"
              ref={starRef}
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
        })} */}
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
