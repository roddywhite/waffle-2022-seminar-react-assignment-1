import "./DeleteMenuModal.css";
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalContext from "../Contexts/modal-context";
import UserContext from "../Contexts/user-context";
import MenuContext from "../Contexts/menu-context";

const DeleteMenuModal = ({ menuId }) => {
  const modalCtx = useContext(ModalContext);
  const userCtx = useContext(UserContext);
  const menuCtx = useContext(MenuContext);
  const navigate = useNavigate();
  const { authAxios } = userCtx;
  const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";
  const errMsg = (text) => toast.error(text, { theme: "colored" });
  const successMsg = (text) => toast.success(text, { theme: "colored" });

  const submitHandler = async () => {
    console.log(menuId);
    console.log(typeof menuId);
    authAxios
      .delete(`${end}/menus/${menuId}`)
      .then((res) => {
        menuCtx.fetchEntireMenus();
        modalCtx.onCloseDeleteMenu();
        menuCtx.selectResetHandler();
        successMsg("메뉴가 삭제되었습니다");
        navigate(-1);
      })
      .catch((res) => {
        errMsg(res.response.data.message);
        modalCtx.onCloseDeleteMenu();
      });
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
