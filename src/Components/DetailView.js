import { useState, useContext, useEffect } from "react";
import UserContext from "../Contexts/user-context";
import { Link, useParams, useNavigate } from "react-router-dom";

import "./DetailView.css";
import Header from "./Header";
import NotFound from "./NotFound";
import DeleteModal from "./DeleteModal";
import MenuContext from "../Contexts/menu-context";

import backArrow from "../assets/backArrow.svg";
import editButton from "../assets/editButton.svg";
import deleteButton from "../assets/deleteButton.svg";
import altImg from "../assets/logo.svg";
import ModalContext from "../Contexts/modal-context";

const DetailView = () => {
  const userCtx = useContext(UserContext);
  const menuCtx = useContext(MenuContext);
  const modalCtx = useContext(ModalContext);

  const navigate = useNavigate();
  const { menuId } = useParams();

  const menu = menuCtx.findMenuById(Number(menuId));

  // menu가 params로 찾아지지 않는다면 notfound 렌더 / 찾아진다면 올바른 페이지 렌더
  // 그리고 로그인시에만 수정버튼 렌더
  return (
    <>
      {!menu && <NotFound />}
      {menu && (
        <>
          <Header />
          <DeleteModal />
          <div className="detailView-bigContainer">
            <div className="leftContainer">
              <div className="backContainer">
                <img
                  className="backArrow"
                  src={backArrow}
                  alt="Back"
                  onClick={() => navigate("/stores/1")}
                />
                <a>메뉴 목록</a>
              </div>

              <div className="detailView">
                <img
                  className="menuImg"
                  src={menu.image}
                  onError={(e) => (e.target.src = altImg)}
                />
                <h3>{menu.name}</h3>
                <span>{menu.type}</span>
                <span>{menu.price.toLocaleString()}원</span>
                <a>{menu.description ? menu.description : "설명 없음"}</a>

                {userCtx.isLoggedIn && (
                  <div className="viewButtonContainer">
                    <Link to={`/menus/${menuId}/edit`}>
                      <img className="editButton" src={editButton} alt="Edit" />
                    </Link>
                    <img
                      className="deleteButton"
                      onClick={modalCtx.onOpenDeleteModal}
                      src={deleteButton}
                      alt="Delete"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="rightContainer">
              <a>TODO</a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailView;
