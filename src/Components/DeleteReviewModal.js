import "./DeleteMenuModal.css";
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModalContext from "../Contexts/modal-context";
import UserContext from "../Contexts/user-context";

const DeleteReviewModal = ({ reviewId, fetchReviewData }) => {
  const modalCtx = useContext(ModalContext);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const submitHandler = async () => {
    await userCtx.onDeleteReview(reviewId);
    fetchReviewData();
    modalCtx.onCloseDeleteReview();
  };

  const cancelHandler = () => {
    modalCtx.onCloseDeleteReview();
    console.log('취소')
  };

  //모달 영역 지정해서 바깥 클릭하면 닫히도록
  const deleteReviewRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e) => {
    if (modalCtx.deleteReviewOpened) {
      !deleteReviewRef.current.contains(e.target)
        ? modalCtx.onCloseDeleteReview()
        : modalCtx.onOpenDeleteReview();
    }
  };

  return (
    <div className={modalCtx.deleteReviewOpened ? "dimmed" : ""}>
        <div
          id="modal-animation"
          className={
            modalCtx.deleteReviewOpened ? "openDeleteModal" : "closedModal"
          }
          ref={deleteReviewRef}
          value={modalCtx.deleteReviewOpened}
        >
          <h3>리뷰 삭제</h3>
          <a>정말로 삭제하시겠습니까?</a>
          <div className="buttonCon">
            <button className="redButton" onClick={submitHandler}>
              삭제
            </button>
            <button className="button" onClick={cancelHandler}>
              취소
            </button>
          </div>
        </div>
      </div>
  );
};

export default DeleteReviewModal;
