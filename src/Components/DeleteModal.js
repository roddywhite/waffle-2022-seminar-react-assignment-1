import "./AddModal.css";
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModalContext from "../Contexts/modal-context";
import MenuContext from "../Contexts/menu-context";

const DeleteModal = () => {
  const menuCtx = useContext(MenuContext);
  const modalCtx = useContext(ModalContext);
  const navigate = useNavigate();
  console.log(useParams());

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(-1);
    menuCtx.onDeleteMenu();
    modalCtx.onCloseDeleteModal();

    console.log(menuCtx.menus);
  };

  const cancelHandler = () => {
    modalCtx.onCloseDeleteModal();
  };

  //모달 영역 지정해서 바깥 클릭하면 닫히도록
  const deleteModalRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e) => {
    if (modalCtx.deleteModalOpened) {
      !deleteModalRef.current.contains(e.target)
        ? modalCtx.onCloseDeleteModal()
        : modalCtx.onOpenDeleteModal();
    }
  };

  return (
    <div
      className={
        modalCtx.deleteModalOpened
          ? "openModalContainer"
          : "closedModalContainer"
      }
    >
      <div
        id="modal-animation"
        className={
          modalCtx.deleteModalOpened ? "openDeleteModal" : "closedModal"
        }
        ref={deleteModalRef}
        value={modalCtx.deleteModalOpened}
      >
        <h3 className="modalTitle">메뉴 삭제</h3>
        <h5 className="deleteDescription">정말로 삭제하시겠습니까?</h5>
        <div className="buttonCon">
          <button className="greenButton" onClick={submitHandler}>
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

export default DeleteModal;
