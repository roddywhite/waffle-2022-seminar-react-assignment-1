import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuContext from "../Contexts/menu-context";
import SearchContext from "../Contexts/search-context";
import Header from "./Header";
import SearchStore from "./SearchStore";
import StoreShortcut from "./StoreShortcut";
import "./Home.css";
import { end } from "../utils/common";


const Home = () => {
  const searchCtx = useContext(SearchContext);
  const menuCtx = useContext(MenuContext);
  const [stores, setStores] = useState<user[] | null>(null);
  
  useEffect(() => {
    let timer = setTimeout(() => {
      axios
        .get(
          `${end}/owners/${
            searchCtx.enteredStore && `?name=${searchCtx.enteredStore}`
          }`
        )
        .then((res) => {
          const storeList: user[] = res.data
          setStores(storeList.filter((owner: user) => owner.store_name !== undefined));
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchCtx.enteredStore]);

  // 스토어 밖(홈화면)으로 나가면 메뉴검색 초기화
  useEffect(() => {
    searchCtx.resetEnteredMenu();
    searchCtx.resetFilter();
    menuCtx.onSelectReset();
  }, []);

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
