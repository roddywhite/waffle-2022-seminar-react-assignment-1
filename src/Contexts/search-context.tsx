import React, { createContext, useState } from "react";

const SearchContext = createContext({
  enteredStore: "",
  onSearchStore: (e: React.ChangeEvent<HTMLInputElement>) => {},
  resetEnteredStore: () => {},
  enteredMenu: "",
  onSearchMenu: (e: React.ChangeEvent<HTMLInputElement>) => {},
  resetEnteredMenu: () => {},
  enteredRating: 0,
  onFilterRating: (e: React.ChangeEvent<HTMLSelectElement>) => {},
  enteredType: "",
  onFilterType: (e: React.ChangeEvent<HTMLSelectElement>) => {},
  resetFilter: () => {},
});

export const SearchContextProvider = (props: any) => {
  const [enteredStore, setEnteredStore] = useState<string>("");
  const [enteredMenu, setEnteredMenu] = useState<string>("");
  const [enteredRating, setEnteredRating] = useState<number>(0);
  const [enteredType, setEnteredType] = useState<string>("");

  const searchStoreHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredStore(e.target.value);
  };
  const searchMenuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredMenu(e.target.value);
  };

  const filterRatingHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEnteredRating(Number(e.target.value));
  };

  const filterTypeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEnteredType(e.target.value);
  };

  const resetEnteredStore = (): void => {
    setEnteredStore("");
  };

  const resetEnteredMenu = (): void => {
    setEnteredMenu("");
  };

  const resetFilter = (): void => {
    setEnteredRating(0);
    setEnteredType("");
  };

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
