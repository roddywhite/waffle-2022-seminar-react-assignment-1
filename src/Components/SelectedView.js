import { useContext } from "react";
import { Link } from "react-router-dom";

import MenuContext from "../Contexts/menu-context";
import "./SelectedView.css";
import closeButton from "../assets/closeButton.svg";
import altImg from "../assets/logo.svg";

const SelectedView = () => {
  const menuCtx = useContext(MenuContext);
  return (
    <div className="selectedView">
      <img
        className="closeButton"
        onClick={() => menuCtx.onSelectMenu(menuCtx.selectedMenu)}
        src={closeButton}
        alt="닫기"
      />
      <img
        className="menuImg"
        src={menuCtx.selectedMenu.image}
        onError={(e) => (e.target.src = altImg)}
      />
      <h3>{menuCtx.selectedMenu.name}</h3>
      <span>{menuCtx.selectedMenu.type}</span>
      <span>{menuCtx.selectedMenu.price.toLocaleString()}원</span>
      <div className="detailButtonContainer">
        <Link to={`/menus/${menuCtx.selectedMenu.id}`}>
          <button className="detailButton">자세히</button>
        </Link>
      </div>
    </div>
  );
};

export default SelectedView;
