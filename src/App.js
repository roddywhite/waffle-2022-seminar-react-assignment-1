import { useState, createContext, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import data from "./assets/data.json";

import Header from "./Components/Header";
import Home from "./Components/Home";
import Search from "./Components/Search";
import List from "./Components/List";
import LoginForm from "./Components/LoginForm";
import UserContext from "./Contexts/user-context";

function App() {
  const userCtx = useContext(UserContext);

  console.log(userCtx.isLoggedIn)

  return (
    <div>
        {/* {userCtx.isLoggedIn ? ( */}
          <Routes>
            <Route exact path="/" component={Home} />
          </Routes>
        {/* ) : (
          <Routes>
            <Route path="/login" component={LoginForm} />
          </Routes>
        )} */}
    </div>
  );
}

export default App;
