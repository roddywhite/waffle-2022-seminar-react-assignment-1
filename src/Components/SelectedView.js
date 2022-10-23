import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import MenuContext from "../Contexts/menu-context";
import "./SelectedView.css";
import closeButton from "../assets/closeButton.svg";
import altImg from "../assets/logo.svg";

const SelectedView = ({ menus }) => {
  const menuCtx = useContext(MenuContext);
  const { storeId } = useParams();
  const menu = menuCtx.selectedMenu;
  return (
    <div className="selectedView">
      <img
        className="closeButton"
        onClick={() => menuCtx.onSelectMenu(menu)}
        src={closeButton}
        alt="닫기"
      />
      <img
        className="menuImg"
        src={menu.image}
        onError={(e) => (e.target.src = altImg)}
      />
      <h3>{menu.name}</h3>
      <span>{menu.type === "waffle"
            ? "와플"
            : menu.type === "beverage"
            ? "음료"
            : menu.type === "coffee"
            ? "커피"
            : ""}</span>
      <span>{menu.price.toLocaleString()}원</span>
      <div className="detailButtonContainer">
        <Link
          to={`/stores/${storeId}/menus/${menu.id}`}
          state={{ menus: menus, storeId: storeId }}
        >
          <button className="detailButton">자세히</button>
        </Link>
      </div>
    </div>
  );
};

export default SelectedView;
