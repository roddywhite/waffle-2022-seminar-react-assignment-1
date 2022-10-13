import { useState, useContext } from "react";

import data from "../assets/data.json";

import Header from "./Header";
import Search from "./Search";
import List from "./List";
import UserContext from "../Contexts/user-context";
import MenuContext from "../Contexts/menu-context";

const Store1 = () => {

  return (
    <div>
      <Header />
      <Search />
      <List/>
    </div>
  );
};

export default Store1;
