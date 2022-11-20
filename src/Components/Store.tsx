import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import Search from "./Search";
import List from "./List";
import HeaderStore from "./HeaderStore";
import SearchContext from "../Contexts/search-context";

const Store = () => {
  const searchCtx = useContext(SearchContext);
  // 스토어 진입하면 스토어검색어 초기화
  useEffect(() => {
    searchCtx.resetEnteredStore();
  }, []);
  return (
    <div>
      <HeaderStore />
      <Search />
      <List />
    </div>
  );
};

export default Store;
