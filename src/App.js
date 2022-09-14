import { useEffect, useState } from "react";

import data from "./assets/data.json";

import Header from "./Components/Header";
import Search from "./Components/Search";
import List from "./Components/List";

function App() {
  const [menus, setMenus] = useState(data);
  const [nowId, setNowId] = useState(data.length+1);

  const addMenuHandler = (newMenu) => {
    setNowId(nowId + 1);
    newMenu.id = nowId;
    setMenus([...menus, newMenu])
  };

  const [enteredSearch, setEnteredSearch] = useState("");
  const doSearch = (e) => setEnteredSearch(e.target.value);

  

  return (
    <div>
      <Header></Header>
      <Search enteredSearch={enteredSearch} setEnteredSearch={setEnteredSearch}></Search>
      <List menus={menus} addMenu={addMenuHandler} enteredSearch={enteredSearch}></List>
    </div>
  );
}

export default App;
