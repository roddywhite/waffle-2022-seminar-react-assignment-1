import { useState, useContext, useEffect } from "react";
import axios from "axios";
import MenuContext from "../Contexts/menu-context";
import "./Item.css";

import starEmpty from "../assets/starEmpty.svg";
import starHalf from "../assets/starHalf.svg";
import starFull from "../assets/starFull.svg";

const Item = ({ menu, menus }) => {
  const menuCtx = useContext(MenuContext);
  const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";
  const isSelected =
    menuCtx.selectedMenu && menuCtx.selectedMenu.id === menu.id;

  const [rating, setRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  const fetchMenuRating = () => {
    axios.get(`${end}/reviews/?menu=${menu.id}`).then((res) => {
      const reviewList = res.data.data;
      let sum = 0;
      reviewList.forEach((x) => (sum += x.rating));
      setRating(sum / reviewList.length);
    });
  };
  useEffect(() => fetchMenuRating(), [menus]);

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
                  x <= rating/2
                    ? starFull
                    : x < 1+rating/2
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
