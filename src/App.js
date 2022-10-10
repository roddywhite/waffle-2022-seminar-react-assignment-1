import { useState } from "react";

import data from "./assets/data.json";

import Header from "./Components/Header";
import Search from "./Components/Search";
import List from "./Components/List";

function App() {
  const [menus, setMenus] = useState(data);
  const [nowId, setNowId] = useState(data.length + 1);

  const addMenuHandler = (newMenu) => {
    console.log(newMenu)
    setNowId(nowId + 1);
    let tmpMenu = {...newMenu, id: nowId}
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
}

export default App;
