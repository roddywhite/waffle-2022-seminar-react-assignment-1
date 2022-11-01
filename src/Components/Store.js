import { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import Header from "./Header";
import Search from "./Search";
import List from "./List";
import HeaderStore from "./HeaderStore";

const Store = () => {
  const { storeId } = useParams();
  return (
    <div>
      <HeaderStore />
      <Search />
      <List storeId={storeId}/>
    </div>
  );
};

export default Store;
