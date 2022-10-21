import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/user-context";
import Header from "./Header";
import SearchStore from "./SearchStore";
import StoreShortcut from "./StoreShortcut";
import "./Home.css";

const Home = () => {
  const userCtx = useContext(UserContext);
  const test = userCtx.testtest
  return (
    <div>
      <Header />
      <SearchStore />
      <div className="bigContainer">
        <div className="homeContainer">
          <Link to='/stores/1'>
            <StoreShortcut />
          </Link>
          <StoreShortcut />
          <StoreShortcut />
          <StoreShortcut />
          <StoreShortcut />
          <StoreShortcut />
          <StoreShortcut />
          <StoreShortcut />
          <button onClick={test}>test용</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
