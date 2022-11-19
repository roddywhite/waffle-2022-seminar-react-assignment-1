import "./DeleteMenuModal.css";
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { end, errMsg, successMsg } from "../utils/common";
import ModalContext from "../Contexts/modal-context";
import UserContext from "../Contexts/user-context";
import MenuContext from "../Contexts/menu-context";

interface DetailViewProps {
  menuId?: string
}

const DeleteMenuModal = ({ menuId }: DetailViewProps) => {
  const modalCtx = useContext(ModalContext);
  const userCtx = useContext(UserContext);
  const menuCtx = useContext(MenuContext);
  const navigate = useNavigate();
  const { authAxios } = userCtx;

  const submitHandler = async () => {
    authAxios
      .delete(`${end}/menus/${menuId}`)
      .then((res) => {
        successMsg("메뉴가 삭제되었습니다");
        modalCtx.onCloseDeleteMenu();
        navigate(-1);
      })
      .catch((res) => {
        console.log(res);
        errMsg(res.response.data.message);
        modalCtx.onCloseDeleteMenu();
      });
  };

  const cancelHandler = (): void => {
    modalCtx.onCloseDeleteMenu();
  };

  //모달 영역 지정해서 바깥 클릭하면 닫히도록
  const deleteMenuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e: MouseEvent) => {
    if (modalCtx.deleteMenuOpened) {
      !(deleteMenuRef?.current as HTMLElement).contains(e.target as HTMLElement)
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
