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
    editedMenus[menuIdx].name = enteredTitle;
    editedMenus[menuIdx].price = enteredPrice;
    editedMenus[menuIdx].image = enteredUrl;

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
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
