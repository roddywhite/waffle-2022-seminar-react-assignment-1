import { useContext } from "react";
import MenuContext from "../Contexts/menu-context";
import SearchContext from "../Contexts/search-context";

import Item from "./Item";

import "./Table.css";

const Table = () => {
  const menuCtx = useContext(MenuContext);
  const searchCtx = useContext(SearchContext);
  return (
    <>
      <div className="theader">
        <span className="id">ID</span>
        <span className="name">이름</span>
        <span className="type">종류</span>
        <span className="price">가격</span>
      </div>
      {menuCtx.menus
        .filter((menu) => menu.name.includes(searchCtx.enteredSearch))
        .map((menu) => (
          <Item key={menu.id} menu={menu} />
        ))}
    </>
  );
};

export default Table;
