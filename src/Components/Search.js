import { useState } from "react";
import "./Search.css";
import searchImg from "../assets/search.png";

const Search = ({ enteredSearch, setEnteredSearch }) => {
  return (
    <div className="search">
      <label>
        이름 검색:
        <input
          className="searchBox"
          type="text"
          value={enteredSearch}
          onChange={(e) => setEnteredSearch(e.target.value)}
          placeholder="검색어 입력"
        />
      </label>
      <img className="searchImg" src={searchImg} />
    </div>
  );
};

export default Search;
