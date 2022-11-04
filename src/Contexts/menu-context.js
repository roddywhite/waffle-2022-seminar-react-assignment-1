import { createContext, useEffect, useState } from "react";
import axios from "axios";

const MenuContext = createContext({
  entireMenus: null,
  menus: null,
  selectedMenu: null,
  storeRatingCalculator: () => {},
  fetchEntireMenus: () => {},
  fetchMenuData: () => {},
  fetchMenuById: () => {},
  onSelectMenu: () => {},
  selectResetHandler: () => {},
  findMenuById: () => {},
});

export const MenuContextProvider = (props) => {
  const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";

  const [entireMenus, setEntireMenus] = useState([]);
  const [menus, setMenus] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const fetchMenuById = (menuId) => {
    axios.get(`${end}/menus/${menuId}`).then((res) => {
      return res.data;
    });
  };

  // 전체메뉴
  const fetchEntireMenus = () => {
    axios.get(`${end}/menus/`).then((res) => {
      setEntireMenus(res.data.data);
    });
  };
  useEffect(() => fetchEntireMenus(), []);

  // storeId로 메뉴
  const fetchMenuData = (storeId) => {
    axios.get(`${end}/menus/?owner=${storeId}`).then((res) => {
      setMenus(res.data.data.reverse());
    });
  };

  // 스토어 평점 평균 계산
  const storeRatingCalculator = async (storeId) => {
    let sum = 0;
    let count = 0;
    let menuList = [];
    let reviewList = [];
    axios.get(`${end}/menus/?owner=${storeId}`).then((res) => {
      menuList = res.data.data;
    });
    menuList.forEach((m) => {
      axios.get(`${end}/reviews/?menu=${m?.id}`).then((res) => {
        reviewList = res.data.data;
      });
      reviewList.forEach((r) => {
        sum += r?.rating;
        count += 1;
      });
    });
    return sum / count;
  };

  const selectMenuHandler = (menu) => {
    const isSelectedMenu = selectedMenu && menu?.id === selectedMenu?.id;
    setSelectedMenu(() => (isSelectedMenu ? null : menu));
  };

  // 스토어 페이지 벗어나면 선택 리셋 시켜주기 위해서
  const selectResetHandler = () => {
    setSelectedMenu(null);
  };

  // id로 특정 메뉴 object 찾아서 반환
  const findMenuById = (menuList, id) => {
    for (let i = 0; i < menuList.length; i++) {
      if (menuList[i].id === id) return menuList[i];
    }
  };

  return (
    <MenuContext.Provider
      value={{
        entireMenus: entireMenus,
        menus: menus,
        selectedMenu: selectedMenu,
        storeRatingCalculator: storeRatingCalculator,
        fetchEntireMenus: fetchEntireMenus,
        fetchMenuData: fetchMenuData,
        fetchMenuById: fetchMenuById,
        onSelectMenu: selectMenuHandler,
        onSelectReset: selectResetHandler,
        findMenuById: findMenuById,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
