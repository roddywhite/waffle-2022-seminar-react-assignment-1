import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenuContext from "../Contexts/menu-context";
import SearchContext from "../Contexts/search-context";

import Item from "./Item";

import "./Table.css";

const Table = () => {
  const menuCtx = useContext(MenuContext);
  const searchCtx = useContext(SearchContext);
  const { storeId } = useParams();
  const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";

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
      {menus && menus.map((menu, idx) => <Item key={idx} menu={menu} />)}
    </>
  );
};

export default Table;
