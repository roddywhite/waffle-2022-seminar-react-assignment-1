import { useEffect, useRef } from "react";

import Item from "./Item";

import "./Table.css";

const Table = ({ menus, selectedMenu, handleSelectMenu, enteredSearch }) => {
  return (
    <>
      <div className="theader">
        <span className="id">ID</span>
        <span className="name">이름</span>
        <span className="price">가격</span>
      </div>
      {menus
        .filter((menu) => menu.name.includes(enteredSearch))
        .map((menu) => (
          <Item
            key={menu.id}
            menu={menu}
            selectedMenu={selectedMenu}
            handleSelectMenu={() => handleSelectMenu(menu)}
          />
        ))}
    </>
  );
};

export default Table;
