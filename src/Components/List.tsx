import { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "../Contexts/user-context";
import MenuContext from "../Contexts/menu-context";
import "./List.scss";

import Table from "./Table";
import AddButton from "./AddButton";
import SelectedView from "./SelectedView";

const List = () => {
  const { storeId } = useParams<{storeId: string}>();
  const menuCtx = useContext(MenuContext);
  const userCtx = useContext(UserContext);
  const {
    fetchMenuData,
    selectedMenu,
  }: {
    fetchMenuData: (storeId: string) => void;
    selectedMenu: menu | null;
  } = menuCtx;
  const { user }: { user: user | null } = userCtx;

  useEffect(() => fetchMenuData(storeId as string), [selectedMenu, storeId]);

  return (
    <div className="bigContainer">
      <div className="container">
        <Table />
        {user!?.id === Number(storeId) && (
          <Link to={`/stores/${storeId}/menus/new`}>
            <AddButton />
          </Link>
        )}
      </div>
      {selectedMenu && <SelectedView />}
    </div>
  );
};

export default List;
