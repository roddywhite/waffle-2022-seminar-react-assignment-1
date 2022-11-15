import { createContext, useState } from "react";

const SearchContext = createContext({
  enteredStore: "",
  onSearchStore: () => {},
  resetEnteredStore: () => {},
  enteredMenu: "",
  onSearchMenu: () => {},
  resetEnteredMenu: () => {},
  enteredRating: 0,
  onFilterRating: () => {},
  enteredType: "",
  onFilterType: () => {},
  resetFilter: () => {},
});

export const SearchContextProvider = (props) => {
  const [enteredStore, setEnteredStore] = useState("");
  const [enteredMenu, setEnteredMenu] = useState("");
  const [enteredRating, setEnteredRating] = useState(0);
  const [enteredType, setEnteredType] = useState("");

  const searchStoreHandler = (e) => {
    setEnteredStore(e.target.value);
  };
  const searchMenuHandler = (e) => {
    setEnteredMenu(e.target.value);
  };

  const filterRatingHandler = (e) => {
    setEnteredRating(Number(e.target.value));
  };

  const filterTypeHandler = (e) => {
    setEnteredType(e.target.value);
  };

  const resetEnteredStore = () => {
    setEnteredStore("");
  };

  const resetEnteredMenu = () => {
    setEnteredMenu("");
  };

  const resetFilter = () => {
    setEnteredRating(0);
    setEnteredType("");
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
        enteredRating: enteredRating,
        onFilterRating: filterRatingHandler,
        enteredType: enteredType,
        onFilterType: filterTypeHandler,
        resetFilter: resetFilter,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
