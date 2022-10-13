import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import UserContext from "./Contexts/user-context";

import Home from "./Components/Home";
import Store1 from "./Components/Store1";
import LoginForm from "./Components/LoginForm";
import AddMenu from "./Components/AddMenu";
import EditMenu from "./Components/EditMenu";
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
        <Route path="/menus/:menuId/edit" element={<EditMenu />} />
        <Route path="/menus/new" element={<AddMenu />} />
        <Route path="/404-not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
