import { useContext } from "react";
import UserContext from "../Contexts/user-context";
import { Link, useParams } from "react-router-dom";

import Header from "./Header";
import DeleteModal from "./DeleteModal";
import MenuContext from "../Contexts/menu-context";

import editButton from "../assets/editButton.svg";
import deleteButton from "../assets/deleteButton.svg";
import ModalContext from "../Contexts/modal-context";

const DetailView = () => {
  const userCtx = useContext(UserContext);
  const menuCtx = useContext(MenuContext);
  const modalCtx = useContext(ModalContext);

  const { menuId } = useParams();
  console.log(useParams());

  return (
    <>
      <Header />

      <DeleteModal />

      <img
        className="menuImg"
        src={menuCtx.selectedMenu.image}
        onError={(e) => (e.target.src = altImg)}
      />
      <h3>{menuCtx.selectedMenu.name}</h3>
      <span>{menuCtx.selectedMenu.type}</span>
      <span>{menuCtx.selectedMenu.price.toLocaleString()}원</span>
      <a>{menuCtx.selectedMenu.description}</a>

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
    </>
  );
};

export default DetailView;
