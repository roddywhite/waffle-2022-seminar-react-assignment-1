import { useState, createContext, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import data from "./assets/data.json";
import UserContext from "./Contexts/user-context";

import Header from "./Components/Header";
import Home from "./Components/Home";
import Store1 from "./Components/Store1";
import LoginForm from "./Components/LoginForm";
import Search from "./Components/Search";
import List from "./Components/List";
import AddModal from "./Components/AddModal";
import EditModal from "./Components/EditModal";
import DetailView from "./Components/DetailView";
import NotFound from "./Components/NotFound";


function App() {
  const userCtx = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/stores/1" element={<Store1 />} />
        <Route path="/login" element={!userCtx.isLoggedIn ? <LoginForm /> : <Navigate replace to="/" />} />
        <Route path="/menus/:menuId" element={<DetailView />} />
        <Route path="/menus/:menuId/edit" element={<EditModal />} />
        <Route path="/menus/new" element={<AddModal />} />
        <Route path="/404-not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
