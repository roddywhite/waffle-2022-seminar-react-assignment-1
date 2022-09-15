import "./Item.css";

const Item = ({ menu, selectedMenu, handleSelectMenu }) => {
  const isSelected = selectedMenu && selectedMenu.id === menu.id;
  return (
    <div className="menuContainer">
      <article
        className={`menu${isSelected ? "Selected" : ""}`}
        onClick={handleSelectMenu}
      >
        <span className="menuId">{menu.id}</span>
        <span className="menuName">{menu.name}</span>
        <span className="menuPrice">{menu.price}</span>
      </article>
    </div>
  );
};

export default Item;
