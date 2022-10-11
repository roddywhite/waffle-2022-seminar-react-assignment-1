import { useState, createContext, useContext } from "react";

import data from "./assets/data.json";

import Header from "./Components/Header";
import Search from "./Components/Search";
import List from "./Components/List";
import UserContext from "./Contexts/user-context";

function App() {
  
  const userCtx = useContext(UserContext);

  // const [menus, setMenus] = useState(data);
  // const [nowId, setNowId] = useState(data.length + 1);

  // const addMenuHandler = (newMenu) => {
  //   console.log(newMenu)
  //   setNowId(nowId + 1);
  //   let tmpMenu = {...newMenu, id: nowId}
  //   setMenus([...menus, tmpMenu]);
  // };

  const [enteredSearch, setEnteredSearch] = useState("");

  return (
    <div>
      <UserContext.Provider value={{ user: user }}>
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
      </UserContext.Provider>
    </div>
  );
}

export default App;
