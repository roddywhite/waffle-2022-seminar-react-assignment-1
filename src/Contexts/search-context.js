import { createContext, useState } from "react";

const SearchContext = createContext({
  enteredSearch: "",
  onSearch: () => {}
});

export const SearchContextProvider = (props) => {
  const [enteredSearch, setEnteredSearch] = useState("");

  const searchHandler = (e) => {
    setEnteredSearch(e.target.value);
  };

  return (
    <SearchContext.Provider
      value={{ enteredSearch: enteredSearch, onSearch: searchHandler }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
