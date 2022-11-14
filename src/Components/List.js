
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/user-context";
import MenuContext from "../Contexts/menu-context";
import "./List.css";

import Table from "./Table";
import AddButton from "./AddButton";
import SelectedView from "./SelectedView";

const List = ({ storeId }) => {
  const menuCtx = useContext(MenuContext);
  const userCtx = useContext(UserContext);
  const { menus, fetchMenuData } = menuCtx;

  useEffect(() => fetchMenuData(storeId), [menuCtx.selectedMenu]);

  return (
    <div className="bigContainer">
      <div className="container">
        <Table menus={menus} />
        {userCtx.user?.id === Number(storeId) && (
          <Link to={`/stores/${storeId}/menus/new`}>
            <AddButton />
          </Link>
        )}
      </div>
      {menuCtx.selectedMenu && <SelectedView menus={menus} />}
    </div>
  );
};

export default List;
