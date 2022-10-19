import { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import Header from "./Header";
import Search from "./Search";
import List from "./List";

const Store = () => {
  const { storeId } = Number(useParams());
  return (
    <div>
      <Header />
      <Search />
      <List />
    </div>
  );
};

export default Store;
