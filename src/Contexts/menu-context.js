import { createContext, useEffect, useState } from "react";
import data from "../assets/data.json";

const MenuContext = createContext({
  menus: null,
  nowId: 0,
  selectedMenu: null,
  onAddMenu: () => {},
  onEditMenu: () => {},
  onDeleteMenu: () => {},
  onSelectMenu: () => {},
  findMenuById: () => {},
});

export const MenuContextProvider = (props) => {
  // data 파일에서 type이 영어로 나와있는 것들을 한글로 변경
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
    setSelectedMenu(tmpMenu);
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

  // id로 특정 메뉴 object 찾아서 반환
  const findMenuById = (id) => {
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].id === id) return menus[i];
    }
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
        findMenuById: findMenuById,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
