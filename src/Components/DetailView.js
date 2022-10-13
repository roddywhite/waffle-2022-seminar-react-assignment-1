import { useContext } from "react";
import UserContext from "../Contexts/user-context";
import { Link, useParams, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const { menuId } = useParams();
  const { menus, selectedMenu } = menuCtx;
  console.log(useParams());

  // 유효한 주소인지 검증
  const isValid = () => {
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].id === menuId) {
        return 1;
      }
    }
  };

  if (!isValid()) {
    navigate("/404-not-found");
  }

  return (
    <>
      <Header />

      <DeleteModal />

      <button onClick={() => navigate(-1)}>메뉴 목록</button>
      <img
        className="menuImg"
        src={selectedMenu.image}
        onError={(e) => (e.target.src = altImg)}
      />
      <h3>{selectedMenu.name}</h3>
      <span>{selectedMenu.type}</span>
      <span>{selectedMenu.price.toLocaleString()}원</span>
      <a>{selectedMenu.description}</a>

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
