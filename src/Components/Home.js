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
  const userCtx = useContext(UserContext);
  const menuCtx = useContext(MenuContext);
  const test = userCtx.testtest;

  const [owners, setOwners] = useState(null);
  const [stores, setStores] = useState(null);
  // const [storeRating, setStoreRating] = useState(0);

  const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";

  const fetchOwnersData = async () => {
    try {
      const res = await axios.get(`${end}/owners`);
      setOwners(res.data);
      setStores(res.data.filter((owner) => owner.store_name !== undefined));
    } catch (err) {
      console.log("error!!!" + err);
    }
  };

  useEffect(() => {
    fetchOwnersData();
  }, [userCtx.isLoggedIn]);

  // const updateStoreRating = (rating) => {
  //   setStoreRating(rating);
  // }

  menuCtx.onSelectReset();

  return (
    <div>
      <Header />
      <SearchStore />
      <div className="bigContainer">
        <div className="homeContainer">
          {owners &&
            stores
              .filter((store) =>
                store.store_name.includes(searchCtx.enteredStore)
              )
              .map((owner, idx) => (
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
          <button onClick={test}>test용</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
