import { useState, useContext } from "react";
import "./AddReview.css";
import starEmpty from "../assets/starEmpty.svg";
import starFull from "../assets/starFull.svg";
import UserContext from "../Contexts/user-context";

const AddReview = ({ menuId }) => {
  const [enteredContent, setEnteredContent] = useState("");
  const [enteredRating, setEnteredRating] = useState(0);
  const userCtx = useContext(UserContext);
  const submitHandler = () => {
    if (enteredRating < 1) {
      window.alert("별점을 체크해주세요")
    } else {
    userCtx.onAddReview(enteredContent, enteredRating, menuId);
    setEnteredContent("");
    setEnteredRating(0);
    }
  };
  return (
    <div className="addReviewSection">
      <div className="starBox">
        <img className="star" src={enteredRating>=1 ? starFull : starEmpty} onClick={()=>setEnteredRating(1)}/>
        <img className="star" src={enteredRating>=2 ? starFull : starEmpty} onClick={()=>setEnteredRating(2)}/>
        <img className="star" src={enteredRating>=3 ? starFull : starEmpty} onClick={()=>setEnteredRating(3)}/>
        <img className="star" src={enteredRating>=4 ? starFull : starEmpty} onClick={()=>setEnteredRating(4)}/>
        <img className="star" src={enteredRating>=5 ? starFull : starEmpty} onClick={()=>setEnteredRating(5)}/>
      </div>
      <textarea
        className="addReviewContainer"
        placeholder="리뷰를 입력하세요"
        value={enteredContent}
        onChange={(e) => setEnteredContent(e.target.value)}
      />
      <button className="greenBtn" onClick={submitHandler}>저장</button>
    </div>
  );
};

export default AddReview;