import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./Components/Home";
import Store from "./Components/Store";
import LoginForm from "./Components/LoginForm";
import AddMenu from "./Components/AddMenu";
import EditMenu from "./Components/EditMenu";
import DetailView from "./Components/DetailView";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/stores/:storeId" element={<Store />} />
        <Route path="/stores/:storeId/menus/new" element={<AddMenu />} />
        <Route path="/stores/:storeId/menus/:menuId" element={<DetailView />} />
        <Route path="/stores/:storeId/menus/:menuId/edit" element={<EditMenu />} />
        <Route path="/profile/:ownerId" element={<Profile/>} />
        <Route path="/404-not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404-not-found" />} />
      </Routes>
    </>
  );
}

export default App;
