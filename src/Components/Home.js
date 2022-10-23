import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/user-context";
import MenuContext from "../Contexts/menu-context";
import Header from "./Header";
import SearchStore from "./SearchStore";
import StoreShortcut from "./StoreShortcut";
import "./Home.css";

const Home = () => {
  const userCtx = useContext(UserContext);
  const menuCtx = useContext(MenuContext)
  const test = userCtx.testtest;

  const { owners, stores } = userCtx;
  menuCtx.onSelectReset();

  return (
    <div>
      <Header />
      <SearchStore />
      <div className="bigContainer">
        <div className="homeContainer">
          {owners &&
            stores.map((owner) => (
              <Link to={`/stores/${owner.id}`}>
                <StoreShortcut
                  key={owner.id}
                  storeName={owner.store_name}
                  ownerName={owner.username}
                  storeDesc={owner.store_description}
                />
              </Link>
            ))}
          <button onClick={test}>test용</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
