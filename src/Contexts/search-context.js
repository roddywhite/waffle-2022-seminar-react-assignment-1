import { createContext, useState } from "react";

const SearchContext = createContext({
  enteredStore: "",
  onSearchStore: () => {},
  resetEnteredStore: () => {},
  enteredMenu: "",
  onSearchMenu: () => {},
  resetEnteredMenu: () => {},
});

export const SearchContextProvider = (props) => {
  const [enteredStore, setEnteredStore] = useState("");
  const [enteredMenu, setEnteredMenu] = useState("");

  const searchStoreHandler = (e) => {
    setEnteredStore(e.target.value);
  };
  const searchMenuHandler = (e) => {
    setEnteredMenu(e.target.value);
  };

  const resetEnteredStore = () => {
    setEnteredStore('');
  }

  const resetEnteredMenu = () => {
    setEnteredMenu('');
  }

  return (
    <SearchContext.Provider
      value={{
        enteredStore: enteredStore,
        onSearchStore: searchStoreHandler,
        resetEnteredStore: resetEnteredStore,
        enteredMenu: enteredMenu,
        onSearchMenu: searchMenuHandler,
        resetEnteredMenu: resetEnteredMenu,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
