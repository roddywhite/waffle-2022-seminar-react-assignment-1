import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./Components/Home";
import Store1 from "./Components/Store1";
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
        <Route exact path="/stores/1" element={<Store1 />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/menus/new" element={<AddMenu />} />
        <Route path="/menus/:menuId" element={<DetailView />} />
        <Route path="/menus/:menuId/edit" element={<EditMenu />} />
        <Route path="/404-not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404-not-found" />} />
      </Routes>
    </>
  );
}

export default App;
