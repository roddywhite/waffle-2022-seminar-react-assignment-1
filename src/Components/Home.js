import { useState, createContext, useContext } from "react";

import data from "../assets/data.json";

import Header from "./Header";
import Search from "./Search";
import List from "./List";
import UserContext from "../Contexts/user-context";

const Home = () => {
  const userCtx = useContext(UserContext);

  const [menus, setMenus] = useState(data);
  const [nowId, setNowId] = useState(data.length + 1);

  const addMenuHandler = (newMenu) => {
    console.log(newMenu);
    setNowId(nowId + 1);
    let tmpMenu = { ...newMenu, id: nowId };
    setMenus([...menus, tmpMenu]);
  };

  const [enteredSearch, setEnteredSearch] = useState("");

  return (
    <div>
      <Header />

      <Search
        enteredSearch={enteredSearch}
        setEnteredSearch={setEnteredSearch}
      />
      <List
        menus={menus}
        setMenus={setMenus}
        addMenu={addMenuHandler}
        enteredSearch={enteredSearch}
      />
    </div>
  );
};

export default Home;
