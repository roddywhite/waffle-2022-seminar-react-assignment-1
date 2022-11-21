import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { end } from "../utils/common";
import MenuContext from "../Contexts/menu-context";
import "./SelectedView.scss";
import closeButton from "../assets/closeButton.svg";
import altImg from "../assets/logo.svg";

const SelectedView = () => {
  const menuCtx = useContext(MenuContext);
  const { storeId } = useParams();
  const [menu, setMenu] = useState<menu | null>(menuCtx.selectedMenu);

  // 최신 정보로 업데이트
  useEffect(() => {
    axios
      .get(`${end}/menus/${(menuCtx.selectedMenu as menu | null)?.id}`)
      .then((res) => {
        setMenu(res.data);
      })
      .catch((res) => {
        menuCtx.onSelectMenu(null);
      });
  }, [menuCtx.selectedMenu]);

  return (
    <>
      {menuCtx.selectedMenu && (
        <div className="selectedView">
          <img
            className="closeButton"
            onClick={() => menuCtx.onSelectMenu(menu)}
            src={closeButton}
            alt="닫기"
          />
          <img
            className="menuImg"
            src={menu!.image}
            onError={(e: any) => (e.target.src = altImg)}
          />
          <h3>{menu!.name}</h3>
          <span>
            {menu!.type === "waffle"
              ? "와플"
              : menu!.type === "beverage"
              ? "음료"
              : menu!.type === "coffee"
              ? "커피"
              : ""}
          </span>
          <span>{menu!.price.toLocaleString()}원</span>
          <div className="detailButtonContainer">
            <Link to={`/stores/${storeId}/menus/${menu!.id}`}>
              <button className="detailButton">자세히</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedView;
