import "./DeleteMenuModal.css";
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModalContext from "../Contexts/modal-context";
import UserContext from "../Contexts/user-context";

const DeleteMenuModal = ({ menuId }) => {
  const modalCtx = useContext(ModalContext);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(-1);
    userCtx.onDeleteMenu(menuId);
    modalCtx.onCloseDeleteMenu();
  };

  const cancelHandler = () => {
    modalCtx.onCloseDeleteMenu();
  };

  //모달 영역 지정해서 바깥 클릭하면 닫히도록
  const deleteMenuRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e) => {
    if (modalCtx.deleteMenuOpened) {
      !deleteMenuRef.current.contains(e.target)
        ? modalCtx.onCloseDeleteMenu()
        : modalCtx.onOpenDeleteMenu();
    }
  };

  return (
    <div className={modalCtx.deleteMenuOpened ? "dimmed" : ""}>
        <div
          id="modal-animation"
          className={
            modalCtx.deleteMenuOpened ? "openDeleteModal" : "closedModal"
          }
          ref={deleteMenuRef}
          value={modalCtx.deleteMenuOpened}
        >
          <h3>메뉴 삭제</h3>
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

export default DeleteMenuModal;
