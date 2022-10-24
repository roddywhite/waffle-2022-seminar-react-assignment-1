import "./List.css";

import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../Contexts/user-context";
import MenuContext from "../Contexts/menu-context";

import Table from "./Table";
import AddButton from "./AddButton";
import SelectedView from "./SelectedView";

const List = ({ storeId }) => {
  const menuCtx = useContext(MenuContext);
  const userCtx = useContext(UserContext);

  const [menus, setMenus] = useState(null);

  const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";
  const fetchMenuData = async () => {
    try {
      const res = await axios.get(`${end}/menus/?owner=${storeId}`);
      console.log(res);
      setMenus(res.data.data.reverse());
    } catch (err) {
      console.log("error!!!" + err);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

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
