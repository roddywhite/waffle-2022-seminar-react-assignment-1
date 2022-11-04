import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Moment from "react-moment";
import "moment/locale/ko";

import "./Review.css";
import "./AddReview.css";

import deleteButton from "../assets/deleteButton.svg";
import editButton from "../assets/editButton.svg";
import starEmpty from "../assets/starEmpty.svg";
import starHalf from "../assets/starHalf.svg";
import starFull from "../assets/starFull.svg";

import UserContext from "../Contexts/user-context";
import DeleteReviewModal from "./DeleteReviewModal";
import ModalContext from "../Contexts/modal-context";

const Review = ({
  reviewId,
  author,
  content,
  createdAt,
  rating,
  fetchReviewData,
  fetchFirstReviews,
  noStop,
}) => {
  const userCtx = useContext(UserContext);
  const modalCtx = useContext(ModalContext);
  const { authAxios } = userCtx;
  const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";
  const errMsg = (text) => toast.error(text, { theme: "colored" });
  const successMsg = (text) => toast.success(text, { theme: "colored" });

  const [mouseOver, setMouseOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [enteredContent, setEnteredContent] = useState(content);
  const [enteredRating, setEnteredRating] = useState(rating);
  const [viewRating, setViewRating] = useState(0);
  const [starChangeMode, setStarChangeMode] = useState(false);

  const submitHandler = () => {
    authAxios
      .patch(`${end}/reviews/${reviewId}`, {
        content: enteredContent,
        rating: enteredRating,
      })
      .then((res) => {
        setMouseOver(false);
        setEditMode(false);
        fetchFirstReviews();
        noStop();
        successMsg("리뷰가 수정되었습니다");
      })
      .catch((res) => {
        errMsg(res.response.data.message);
      });
  };

  return (
    <>
      {deleteMode && modalCtx.deleteReviewOpened && (
        <DeleteReviewModal
          reviewId={reviewId}
          fetchReviewData={fetchReviewData}
          fetchFirstReviews={fetchFirstReviews}
          deleteMode={deleteMode}
          setDeleteMode={setDeleteMode}
        />
      )}
      {!editMode && (
        <div
          className="reviewContainer"
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={() => setMouseOver(false)}
        >
          <div className="headR">
            <label>{author.username}</label>
            {[1, 2, 3, 4, 5].map((x) => {
              return (
                <img
                  className="rating"
                  src={
                    x <= rating / 2
                      ? starFull
                      : x < 1 + rating / 2
                      ? starHalf
                      : starEmpty
                  }
                />
              );
            })}
            <span>
              <Moment fromNow>{createdAt}</Moment>
            </span>
            <div
              className={
                mouseOver && author.id === userCtx.user?.id
                  ? "buttonBox1"
                  : "hidden"
              }
            >
              <img
                className="editBtn"
                src={editButton}
                onClick={() => setEditMode(true)}
              />
              <img
                className="deleteBtn"
                src={deleteButton}
                onClick={() => {
                  setDeleteMode(true);
                  modalCtx.onOpenDeleteReview();
                }}
              />
            </div>
          </div>
          <a>{content}</a>
        </div>
      )}

      {editMode && (
        <div className="addReviewSection">
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
