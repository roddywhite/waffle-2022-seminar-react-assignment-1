import "./DeleteMenuModal.css";
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { end, errMsg, successMsg } from "../utils/common";
import ModalContext from "../Contexts/modal-context";
import UserContext from "../Contexts/user-context";

interface ReviewProps {
  reviewId: string;
  fetchLatestData: () => {};
  fetchFirstReviews: () => {};
  deleteMode: boolean;
  setDeleteMode: (value: React.SetStateAction<boolean>) => void;
  noStop: () => {};
}

const DeleteReviewModal = ({
  reviewId,
  fetchLatestData,
  fetchFirstReviews,
  deleteMode,
  setDeleteMode,
  noStop,
}: ReviewProps) => {
  const modalCtx = useContext(ModalContext);
  const userCtx = useContext(UserContext);
  const { authAxios } = userCtx;

  const submitHandler = (): void => {
    authAxios
      .delete(`${end}/reviews/${reviewId}`)
      .then((res) => {
        fetchLatestData();
        fetchFirstReviews();
        noStop();
        setDeleteMode(false);
        modalCtx.onCloseDeleteReview();
        successMsg("리뷰가 삭제되었습니다");
      })
      .catch((res) => {
        errMsg(res.response.data.message);
        modalCtx.onCloseDeleteReview();
      });
  };

  const cancelHandler = (): void => {
    modalCtx.onCloseDeleteReview();
    setDeleteMode(false);
    console.log("취소");
  };

  //모달 영역 지정해서 바깥 클릭하면 닫히도록
  const deleteReviewRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e: MouseEvent) => {
    if (
      modalCtx.deleteReviewOpened &&
      !(deleteReviewRef.current as HTMLElement).contains(e.target as HTMLElement)
    ) {
      modalCtx.onCloseDeleteReview();
      setDeleteMode(false);
    } else {
      modalCtx.onOpenDeleteReview();
    }
  };

  return (
    <div
      className={
        deleteMode && modalCtx.deleteReviewOpened ? "dimmed" : "closedModal"
      }
    >
      <div
        id="modal-animation"
        className={
          modalCtx.deleteReviewOpened ? "openDeleteModal" : "closedModal"
        }
        ref={deleteReviewRef}
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
