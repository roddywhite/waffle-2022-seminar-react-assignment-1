import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { end } from "../utils/common";

const MenuContext = createContext({
  menus: null,
  selectedMenu: null,
  fetchMenuData: (storeId: string) => {},
  onSelectMenu: (menu: menu) => {},
  onSelectReset: () => {},
});

export const MenuContextProvider = (props: any) => {
  const [menus, setMenus] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);

  // storeId로 메뉴
  const fetchMenuData = (storeId: string) => {
    axios.get(`${end}/menus/?owner=${storeId}`).then((res) => {
      setMenus(res.data.data.reverse());
    });
  };

  const selectMenuHandler = (menu: any) => {
    const isSelectedMenu = selectedMenu && menu?.id === (selectedMenu as menu | null)?.id;
    setSelectedMenu(() => (isSelectedMenu ? null : menu));
  };

  // 스토어 페이지 벗어나면 선택 리셋 시켜주기 위해서
  const selectResetHandler = ():void => {
    setSelectedMenu(null);
  };


  return (
    <MenuContext.Provider
      value={{
        menus: menus,
        selectedMenu: selectedMenu,
        fetchMenuData: fetchMenuData,
        onSelectMenu: selectMenuHandler,
        onSelectReset: selectResetHandler,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
