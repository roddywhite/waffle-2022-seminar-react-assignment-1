import { useContext } from "react";
import SearchContext from "../Contexts/search-context";
import "./Search.css";
import searchImg from "../assets/search.png";

const Search = () => {
  const searchCtx = useContext(SearchContext);
  return (
    <div className="search">
      <label>
        이름 검색:
        <input
          className="searchBox"
          type="text"
          value={searchCtx.enteredMenu}
          onChange={(e) => searchCtx.onSearchMenu(e)}
          placeholder="검색어 입력"
        />
      </label>
      <img className="searchImg" src={searchImg} />
    </div>
  );
};

export default Search;
