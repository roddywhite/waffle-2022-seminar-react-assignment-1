import { useState, useEffect, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { end, errMsg, successMsg } from "../utils/common";
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

interface DetailViewProps {
  reviewId: string,
  author: user,
  content: string,
  createdAt: string,
  rating: number,
  fetchLatestData: ()=>void,
  fetchFirstReviews: ()=>void,
  noStop: ()=>void,
}

const Review = ({
  reviewId,
  author,
  content,
  createdAt,
  rating,
  fetchLatestData,
  fetchFirstReviews,
  noStop,
}: DetailViewProps) => {
  const userCtx = useContext(UserContext);
  const modalCtx = useContext(ModalContext);
  const { authAxios } = userCtx;

  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [enteredContent, setEnteredContent] = useState<string>(content);
  const [enteredRating, setEnteredRating] = useState<number>(rating);
  const [viewRating, setViewRating] = useState<number>(0);
  const [starChangeMode, setStarChangeMode] = useState<boolean>(false);

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
          fetchLatestData={fetchLatestData}
          fetchFirstReviews={fetchFirstReviews}
          deleteMode={deleteMode}
          setDeleteMode={setDeleteMode}
          noStop={noStop}
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
                mouseOver && author.id === (userCtx.user as user | null)?.id
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
                  onClick={(e: any) =>
                    e.clientX - e.target.getBoundingClientRect().left < 10
                      ? setEnteredRating(2 * x - 1)
                      : setEnteredRating(2 * x)
                  }
                  onMouseEnter={(e: any) =>
                    e.clientX - e.target.getBoundingClientRect().left < 10
                      ? setViewRating(2 * x - 1)
                      : setViewRating(2 * x)
                  }
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
