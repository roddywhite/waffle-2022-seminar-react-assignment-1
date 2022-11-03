import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../Contexts/user-context";
import MenuContext from "../Contexts/menu-context";
import Header from "./Header";
import SearchStore from "./SearchStore";
import StoreShortcut from "./StoreShortcut";
import "./Home.css";
import SearchContext from "../Contexts/search-context";

const Home = () => {
  const searchCtx = useContext(SearchContext);
  const menuCtx = useContext(MenuContext);
  const [stores, setStores] = useState(null);
  const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";

  useEffect(() => {
    let timer = setTimeout(() => {
      axios
        .get(
          `${end}/owners/${
            searchCtx.enteredStore && `?name=${searchCtx.enteredStore}`
          }`
        )
        .then((res) => {
          setStores(res.data.filter((owner) => owner.store_name !== undefined));
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchCtx.enteredStore]);

  menuCtx.onSelectReset();

  return (
    <div>
      <Header />
      <SearchStore />
      <div className="bigContainer">
        <div className="homeContainer">
          {stores &&
            stores.map((owner, idx) => (
              <Link to={`/stores/${owner.id}`}>
                <StoreShortcut
                  key={idx}
                  storeId={owner.id}
                  storeName={owner.store_name}
                  ownerName={owner.username}
                  storeDesc={owner.store_description}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
