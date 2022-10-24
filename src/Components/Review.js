import { useState, useEffect, useContext } from "react";
import "./Review.css";
import "./AddReview.css";

import deleteButton from "../assets/deleteButton.svg";
import editButton from "../assets/editButton.svg";
import starEmpty from "../assets/starEmpty.svg";
import starFull from "../assets/starFull.svg";

import UserContext from "../Contexts/user-context";
import DeleteReviewModal from "./DeleteReviewModal";
import ModalContext from "../Contexts/modal-context";

const Review = ({ menuId, reviewId, author, content, createdAt, rating, forceUpdate, makeRender }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [enteredContent, setEnteredContent] = useState(content);
  const [enteredRating, setEnteredRating] = useState(rating);
  

  useEffect(() => {
    setEnteredContent(content);
    setEnteredRating(rating);
  }, [editMode]);

  const userCtx = useContext(UserContext);
  const modalCtx = useContext(ModalContext);

  const submitHandler = () => {
    userCtx.onEditReview(reviewId, enteredContent, enteredRating);
    setEditMode(false);
    makeRender();
  };

  return (
    <>
      <DeleteReviewModal reviewId={reviewId} />
      {!editMode && (
        <div
          className="reviewContainer"
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
        >
          <div className="head">
            <label>{author.username}</label>
            {[1, 2, 3, 4, 5].map((x) => {
              return (
                <img
                  className="rating"
                  src={x <= rating ? starFull : starEmpty}
                />
              );
            })}
            <span>{createdAt}</span>
            <div className={mouseOver && (author.id === userCtx.user?.id) ? "buttonBox" : "hidden"}>
              <img
                className="editBtn"
                src={editButton}
                onClick={() => setEditMode(true)}
              />
              <img
                className="deleteBtn"
                src={deleteButton}
                onClick={modalCtx.onOpenDeleteReview}
              />
            </div>
          </div>
          <a>{content}</a>
        </div>
      )}

      {editMode && (
        <div className="addReviewSection">
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
          <input
            className="addReviewContainer"
            placeholder="리뷰를 입력하세요"
            value={enteredContent}
            onChange={(e) => setEnteredContent(e.target.value)}
          />
          <div className="btnCon">
            <button className="greenBtn" onClick={submitHandler}>
              저장
            </button>
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
