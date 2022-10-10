import "./AddModal.css";
import { useEffect, useState, useRef } from "react";

const DeleteModal = ({
  isOpened,
  openModal,
  closeModal,
  menus,
  setMenus,
  selectedMenu,
  setSelectedMenu,
}) => {
  const submitHandler = (e) => {
    e.preventDefault();

    setMenus(menus.filter((menu) => selectedMenu.id !== menu.id));
    closeModal();
    setSelectedMenu(null);

    console.log(menus);
  };

  //모달 영역 지정해서 바깥 클릭하면 닫히도록
  const deleteModalRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e) => {
    if (isOpened) {
      !deleteModalRef.current.contains(e.target) ? closeModal() : openModal();
    }
  };

  return (
    <div className={isOpened ? "openModalContainer" : "closedModalContainer"}>
      <div
        id="modal-animation"
        className={isOpened ? "openDeleteModal" : "closedModal"}
        ref={deleteModalRef}
        value={isOpened}
      >
        <h3 className="modalTitle">메뉴 삭제</h3>
        <h5 className="deleteDescription">정말로 삭제하시겠습니까?</h5>
        <div className="buttonCon">
          <button className="greenButton" onClick={submitHandler}>
            삭제
          </button>
          <button className="button" onClick={closeModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
