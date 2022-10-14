import { useState, useContext, useEffect } from "react";
import UserContext from "../Contexts/user-context";
import { Link, useParams, useNavigate } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import DeleteModal from "./DeleteModal";
import MenuContext from "../Contexts/menu-context";

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
  const { menus, selectedMenu } = menuCtx;

  return (
    <div>
      <Header />
      <DeleteModal />
      <div className="bigContainer">
        {!menuCtx.isValidParams(menuId) && <NotFound />}
        <div className="leftContainer">
          <button onClick={() => navigate("/stores/1")}>메뉴 목록</button>

          <div className="detailView">
            {selectedMenu && (
              <div>
                <img
                  className="menuImg"
                  src={selectedMenu.image}
                  onError={(e) => (e.target.src = altImg)}
                />
                <h3>{selectedMenu.name}</h3>
                <span>{selectedMenu.type}</span>
                <span>{selectedMenu.price.toLocaleString()}원</span>
                <a>{selectedMenu.description}</a>
              </div>
            )}
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
    </div>
  );
};

export default DetailView;
