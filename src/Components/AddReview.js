import { useState } from "react";
import "./AddReview.css";
import starEmpty from "../assets/starEmpty.svg";
import starFull from "../assets/starFull.svg";

const AddReview = () => {
  const [rating, setRating] = useState(0);
  return (
    <div className="addReviewSection">
      <div className="starBox">
        <img className="star" src={rating>=1 ? starFull : starEmpty} onClick={()=>setRating(1)}/>
        <img className="star" src={rating>=2 ? starFull : starEmpty} onClick={()=>setRating(2)}/>
        <img className="star" src={rating>=3 ? starFull : starEmpty} onClick={()=>setRating(3)}/>
        <img className="star" src={rating>=4 ? starFull : starEmpty} onClick={()=>setRating(4)}/>
        <img className="star" src={rating>=5 ? starFull : starEmpty} onClick={()=>setRating(5)}/>
      </div>
      <input className="addReviewContainer" placeholder="리뷰를 입력하세요" />
      <button className="greenBtn">저장</button>
    </div>
  );
};

export default AddReview;
