import { useContext } from "react";
import SearchContext from "../Contexts/search-context";
import "./SearchStore.css";
import searchImg from "../assets/search.png";
import xButton from "../assets/closeButton.svg";

const Search = () => {
  const searchCtx = useContext(SearchContext);
  return (
    <div className="search-store">
      <label>
        가게 검색:
        <input
          className="searchBox"
          type="text"
          value={searchCtx.enteredStore}
          onChange={(e) => searchCtx.onSearchStore(e)}
          placeholder="검색어 입력"
        />
      </label>
      <div className="buttonBox">
        {searchCtx.enteredStore && (
          <img src={xButton} onClick={searchCtx.resetEnteredStore} />
        )}
        <img className="searchImg" src={searchImg} />
      </div>
    </div>
  );
};

export default Search;
