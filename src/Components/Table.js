import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { end } from "../utils/common";
import SearchContext from "../Contexts/search-context";
import Item from "./Item";
import "./Table.css";

const Table = () => {
  const searchCtx = useContext(SearchContext);
  const { storeId } = useParams();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    let timer = setTimeout(() => {
      axios
        .get(
          `${end}/menus/?owner=${storeId}${
            searchCtx.enteredMenu && `&search=${searchCtx.enteredMenu}`
          }`
        )
        .then((res) => {
          setMenus(res.data.data.reverse());
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchCtx.enteredMenu]);

  return (
    <>
      <div className="theader">
        <span className="id">ID</span>
        <span className="name">이름</span>
        <span className="type">종류</span>
        <span className="price">가격</span>
        <span className="rating">별점</span>
      </div>
      {menus &&
        menus
          .filter((menu) => {
            return searchCtx.enteredType
              ? menu.rating >= searchCtx.enteredRating &&
                  menu.type === searchCtx.enteredType
              : menu.rating >= searchCtx.enteredRating;
          })
          .map((menu, idx) => <Item key={idx} menu={menu} menus={menus} />)}
    </>
  );
};

export default Table;
