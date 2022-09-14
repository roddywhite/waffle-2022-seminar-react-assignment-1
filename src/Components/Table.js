import { useEffect, useRef } from "react";

import Item from './Item';

import "./Table.css";


const Table = ({ menus, enteredSearch }) => {
  /*
  const handleOverMenu = (e) => {
    e.target.parentElement.style.backgroundColor = 'yellow'
  }

  const handleClickMenu = (e) => {
    e.target.parentElement.style.backgroundColor = 'orange'
  }
*/

  return (
    <div>
      <header>
        <span>id</span>
        <span>이름</span>
        <span>가격</span>
      </header>
    {menus.filter((menu) => menu.name.includes(enteredSearch)) 
    .map((menu) => (
      <Item
        key={menu.id}
        menu={menu}
        />
    ))}
    </div>
  )
    }


export default Table;
