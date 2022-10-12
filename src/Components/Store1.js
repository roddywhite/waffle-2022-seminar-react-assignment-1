import { useState, useContext } from "react";

import data from "../assets/data.json";

import Header from "./Header";
import Search from "./Search";
import List from "./List";
import UserContext from "../Contexts/user-context";
import MenuContext from "../Contexts/menu-context";

const Store1 = () => {

  const menuCtx = useContext(MenuContext);


  const [menus, setMenus] = useState(data);
  const [nowId, setNowId] = useState(data.length + 1);

  const addMenuHandler = (newMenu) => {
    console.log(newMenu);
    setNowId(nowId + 1);
    let tmpMenu = { ...newMenu, id: nowId };
    setMenus([...menus, tmpMenu]);
  };

  return (
    <div>
      <Header />
      <Search />
      <List
        menus={menus}
        setMenus={setMenus}
        addMenu={addMenuHandler}
      />
    </div>
  );
};

export default Store1;
