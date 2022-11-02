import "./DeleteMenuModal.css";
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalContext from "../Contexts/modal-context";
import UserContext from "../Contexts/user-context";

const DeleteReviewModal = ({
  reviewId,
  fetchReviewData,
  fetchFirstReviews,
  deleteMode,
  setDeleteMode,
}) => {
  const modalCtx = useContext(ModalContext);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const { authAxios } = userCtx;
  const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";
  const errMsg = (text) => toast.error(text, { theme: "colored" });
  const successMsg = (text) => toast.success(text, { theme: "colored" });

  const submitHandler = () => {
    console.log("클릭!");
    authAxios
      .delete(`${end}/reviews/${reviewId}`)
      .then((res) => {
        fetchReviewData();
        fetchFirstReviews();
        setDeleteMode(false);
        modalCtx.onCloseDeleteReview();
        successMsg("리뷰가 삭제되었습니다");
      })
      .catch((res) => {
        errMsg(res.response.data.message);
      });
  };

  const cancelHandler = () => {
    modalCtx.onCloseDeleteReview();
    setDeleteMode(false);
    console.log("취소");
  };

  //모달 영역 지정해서 바깥 클릭하면 닫히도록
  const deleteReviewRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e) => {
    if (
      modalCtx.deleteReviewOpened &&
      !deleteReviewRef.current.contains(e.target)
    ) {
      modalCtx.onCloseDeleteReview();
      setDeleteMode(false);
    } else {
      modalCtx.onOpenDeleteReview();
    }
  };

  return (
    <div className={deleteMode && modalCtx.deleteReviewOpened ? "dimmed" : "closedModal"}>
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
