import { useState } from "react";
import "./Review.css";
import "./AddReview.css";

import deleteButton from "../assets/deleteButton.svg";
import editButton from "../assets/editButton.svg";
import starEmpty from "../assets/starEmpty.svg";
import starFull from "../assets/starFull.svg";

const Review = () => {
  const [mouseOver, setMouseOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [enteredReview, setEnteredReview] = useState("");
  return (
    <>
      {!editMode && (
        <div
          className="reviewContainer"
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
        >
          <div className="head">
            <label>아이디와 별점</label>
            <span>2 hours ago</span>
            <div className={mouseOver ? "buttonBox" : "hidden"}>
              <img
                className="editBtn"
                src={editButton}
                onClick={() => setEditMode(true)}
              />
              <img className="deleteBtn" src={deleteButton} />
            </div>
          </div>
          <a>좋네요</a>
        </div>
      )}

      {editMode && (
        <div className="addReviewSection">
          <div className="starBox">
            <img className="star" src={rating>=1 ? starFull : starEmpty} onClick={()=>setRating(1)}/>
            <img className="star" src={rating>=2 ? starFull : starEmpty} onClick={()=>setRating(2)}/>
            <img className="star" src={rating>=3 ? starFull : starEmpty} onClick={()=>setRating(3)}/>
            <img className="star" src={rating>=4 ? starFull : starEmpty} onClick={()=>setRating(4)}/>
            <img className="star" src={rating>=5 ? starFull : starEmpty} onClick={()=>setRating(5)}/>
          </div>
          <input
            className="addReviewContainer"
            placeholder="리뷰를 입력하세요"
            value={enteredReview}
            onChange={(e) => setEnteredReview(e.target.value)}
          />
          <div className="btnCon">
            <button className="greenBtn">저장</button>
            <button
              className="cancelBtn"
              onClick={() => {
                setEditMode(false);
                setMouseOver(false);
              }}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
