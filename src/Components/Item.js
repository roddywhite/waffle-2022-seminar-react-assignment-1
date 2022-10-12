import { useContext } from "react";
import MenuContext from "../Contexts/menu-context";
import "./Item.css";

const Item = ({ menu }) => {
  const menuCtx = useContext(MenuContext);
  const isSelected = menuCtx.selectedMenu && menuCtx.selectedMenu.id === menu.id;
  return (
    <div className="menuContainer">
      <article
        className={`menu${isSelected ? "Selected" : ""}`}
        onClick={()=>menuCtx.onSelectMenu(menu)}
      >
        <span className="menuId">{menu.id}</span>
        <span className="menuName">{menu.name}</span>
        <span className="menuType">{menu.type}</span>
        <span className="menuPrice">{menu.price}</span>
      </article>
    </div>
  );
};

export default Item;
