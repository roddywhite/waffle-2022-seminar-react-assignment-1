import "./List.css";

import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/user-context";
import MenuContext from "../Contexts/menu-context";

import Table from "./Table";
import AddButton from "./AddButton";
import SelectedView from "./SelectedView";

const List = () => {
  const menuCtx = useContext(MenuContext);
  const userCtx = useContext(UserContext);

  return (
    <div className="bigContainer">
      <div className="container">
        <Table />
        {userCtx.isLoggedIn && (
          <Link to="/menus/new">
            <AddButton />
          </Link>
        )}
      </div>
      {menuCtx.selectedMenu && <SelectedView />}
    </div>
  );
};

export default List;
