import { useState, useContext, useEffect } from "react";
import MenuContext from "../Contexts/menu-context";
import "./Item.css";
import starEmpty from "../assets/starEmpty.svg";
import starHalf from "../assets/starHalf.svg";
import starFull from "../assets/starFull.svg";

const Item = ({ menu }: { menu: menu }) => {
  const menuCtx = useContext(MenuContext);
  const { selectedMenu } = menuCtx;
  const isSelected = selectedMenu && (selectedMenu as menu)?.id === menu.id;
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
                  x <= Math.round(menu.rating) / 2
                    ? starFull
                    : x < 1 + Math.round(menu.rating) / 2
                    ? starHalf
                    : starEmpty
                }
              />
            );
          })}
        </div>
        <span className="ratingFig">
          {menu.rating ? (Math.round(menu.rating * 10) / 10).toFixed(1) : "0.0"}
        </span>
      </article>
    </div>
  );
};

export default Item;
