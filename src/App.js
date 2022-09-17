import { useState } from "react";

import data from "./assets/data.json";

import Header from "./Components/Header";
import Search from "./Components/Search";
import List from "./Components/List";

function App() {
  const [menus, setMenus] = useState(data);
  const [nowId, setNowId] = useState(data.length + 1);

  const addMenuHandler = (newMenu) => {
    setNowId(nowId + 1);
    newMenu.id = nowId;
    setMenus([...menus, newMenu]);
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
