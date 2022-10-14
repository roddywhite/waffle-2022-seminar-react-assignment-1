import { createContext, useState } from "react";
import data from "../assets/data.json";

const MenuContext = createContext({
  menus: null,
  nowId: 0,
  selectedMenu: null,
  onAddMenu: () => {},
  onEditMenu: () => {},
  onDeleteMenu: () => {},
  onSelectMenu: () => {},
  isValidParams: () => {},
});

export const MenuContextProvider = (props) => {
  const korData = [...data];
  for (let i = 0; i < korData.length; i++) {
    if (korData[i].type === "waffle") {
      korData[i].type = "와플";
    } else if (korData[i].type === "beverage") {
      korData[i].type = "음료";
    } else if (korData[i].type === "coffee") {
      korData[i].type = "커피";
    }
  }

  const [menus, setMenus] = useState(korData);
  const [nowId, setNowId] = useState(data.length + 1);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const addMenuHandler = (newMenu) => {
    setNowId(nowId + 1);
    let tmpMenu = { ...newMenu, id: nowId };
    setMenus([...menus, tmpMenu]);
  };

  const editMenuHandler = (editedMenu) => {
    const editedMenus = [...menus];
    const menuIdx = editedMenus.findIndex((menu) => menu.id === editedMenu.id);
    editedMenus[menuIdx].price = editedMenu.price;
    editedMenus[menuIdx].image = editedMenu.image;
    editedMenus[menuIdx].description = editedMenu.description;

    setMenus(editedMenus);
    setSelectedMenu(editedMenu);
  };

  const deleteMenuHandler = () => {
    setMenus(menus.filter((menu) => selectedMenu.id !== menu.id));
    setSelectedMenu(null);
  };

  const selectMenuHandler = (menu) => {
    const isSelectedMenu = selectedMenu && menu.id === selectedMenu.id;
    setSelectedMenu(() => (isSelectedMenu ? null : menu));
  };

  const isValidParams = (params) => {
    const idList = [];
    for (let i = 0; i < menus.length; i++) {
      idList.push(menus[i].id);
    }
    return idList.includes(Number(params))
  };

  return (
    <MenuContext.Provider
      value={{
        menus: menus,
        nowId: nowId,
        selectedMenu: selectedMenu,
        onAddMenu: addMenuHandler,
        onEditMenu: editMenuHandler,
        onDeleteMenu: deleteMenuHandler,
        onSelectMenu: selectMenuHandler,
        isValidParams: isValidParams,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
