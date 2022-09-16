import "./DetailView.css";

import closeButton from "../assets/closeButton.svg";
import altImg from "../assets/logo.svg";
import editButton from "../assets/editButton.svg";
import deleteButton from "../assets/deleteButton.svg";

const DetailView = ({ selectedMenu, closeView, openModal }) => {
  return (
    <div className="detailView">
      <img
        className="closeButton"
        onClick={() => closeView(selectedMenu)}
        src={closeButton}
        alt="닫기"
      />
      <img
        className="menuImg"
        src={selectedMenu.image}
        onError={(e) => (e.target.src = altImg)}
      />
      <h3>{selectedMenu.name}</h3>
      <span>{selectedMenu.price.toLocaleString()}원</span>
      <div className="viewButtonContainer">
        <img className="editButton" onClick={openModal} src={editButton} alt="Edit" />
        <img className="deleteButton" src={deleteButton} alt="Delete" />
      </div>
    </div>
  );
};

export default DetailView;
