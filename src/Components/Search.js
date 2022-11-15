import { useState, useContext } from "react";
import SearchContext from "../Contexts/search-context";
import "./Search.css";
import searchImg from "../assets/search.png";
import xButton from "../assets/closeButton.svg";
import filterButton from "../assets/filter.svg";
import refreshButton from "../assets/refresh.svg";

const Search = () => {
  const searchCtx = useContext(SearchContext);
  const [filterMode, setFilterMode] = useState(false);
  const filterOn = () => setFilterMode(true);
  const filterOff = () => setFilterMode(false);
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
      <img
        className="searchImg"
        src={searchCtx.enteredMenu ? xButton : searchImg}
        onClick={searchCtx.resetEnteredMenu}
      />
      <img
        className={filterMode ? 'iconImg2' : 'iconImg'}
        src={filterMode ? xButton : filterButton}
        onClick={filterMode ? filterOff : filterOn}
      />
      {filterMode && (
        <div className="filterContainer">
          <select
            name="type"
            className="dropdown"
            value={searchCtx.enteredType}
            onChange={(e) => searchCtx.onFilterType(e)}
          >
            <option value="">종류</option>
            <option value="waffle">와플</option>
            <option value="beverage">음료</option>
            <option value="coffee">커피</option>
          </select>
          <select
            name="rating"
            className="dropdown"
            value={searchCtx.enteredRating}
            onChange={(e) => searchCtx.onFilterRating(e)}
          >
            <option value="0">별점</option>
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((m) => (
              <option value={m}>{m}</option>
            ))}
          </select>
          <img
            className="iconImg2"
            src={refreshButton}
            onClick={searchCtx.resetFilter}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
