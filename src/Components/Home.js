import { useState, createContext, useContext } from "react";
import { Link } from "react-router-dom";

import data from "../assets/data.json";

import Header from "./Header";
import Search from "./Search";
import List from "./List";
import UserContext from "../Contexts/user-context";

const Home = () => {
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
      <div className="bigContainer">
        <div className="container">
          <a>TODO: 여기는 가게 목록을 만들 예정</a>
          <Link to="/stores/1">
            <button>Store1로 바로가기</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
