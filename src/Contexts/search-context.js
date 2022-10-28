import { createContext, useState } from "react";

const SearchContext = createContext({
  enteredStore: "",
  onSearchStore: () => {},
  enteredMenu: "",
  onSearchMenu: () => {},
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

  return (
    <SearchContext.Provider
      value={{
        enteredStore: enteredStore,
        onSearchStore: searchStoreHandler,
        enteredMenu: enteredMenu,
        onSearchMenu: searchMenuHandler,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
