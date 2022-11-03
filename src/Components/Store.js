import { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import Header from "./Header";
import Search from "./Search";
import List from "./List";
import HeaderStore from "./HeaderStore";
import SearchContext from "../Contexts/search-context";

const Store = () => {
  const { storeId } = useParams();
  const searchCtx = useContext(SearchContext);
  // 스토어 진입하면 스토어검색어 초기화
  useEffect(() => {
    searchCtx.resetEnteredStore();
  }, []);
  return (
    <div>
      <HeaderStore />
      <Search />
      <List storeId={storeId} />
    </div>
  );
};

export default Store;
