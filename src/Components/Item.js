import { useContext } from "react";
import MenuContext from "../Contexts/menu-context";
import "./Item.css";

import starEmpty from "../assets/starEmpty.svg";
import starHalf from "../assets/starHalf.svg";
import starFull from "../assets/starFull.svg";

const Item = ({ menu }) => {
  const menuCtx = useContext(MenuContext);
  const isSelected =
    menuCtx.selectedMenu && menuCtx.selectedMenu.id === menu.id;

  const rating = 2.5;
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="menuContainer">
      <article
        className={`menu${isSelected ? "Selected" : ""}`}
        onClick={() => menuCtx.onSelectMenu(menu)}
      >
        <span className="menuId">{menu.id}</span>
        <span className="menuName">{menu.name}</span>
        <span className="menuType">
          {menu.type === "waffle"
            ? "와플"
            : menu.type === "beverage"
            ? "음료"
            : menu.type === "coffee"
            ? "커피"
            : ""}
        </span>
        <span className="menuPrice">{menu.price}</span>
        <div className="menuRating">
          {stars.map((x) => {
            return (
              <img
                className="rating"
                src={
                  x <= rating
                    ? starFull
                    : x - 0.5 === rating
                    ? starHalf
                    : starEmpty
                }
              />
            );
          })}
        </div>
      </article>
    </div>
  );
};

export default Item;
