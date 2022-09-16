import "./List.css";

import { useState } from "react";

import Table from "./Table";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import AddButton from "./AddButton";
import DetailView from "./DetailView";

const List = ({ menus, addMenu, enteredSearch }) => {
  const [addModalOpened, setAddModalOpened] = useState(false);
  const openAddModal = () => setAddModalOpened(true);
  const closeAddModal = () => setAddModalOpened(false);

  const [editModalOpened, setEditModalOpened] = useState(false);
  const openEditModal = () => setEditModalOpened(true);
  const closeEditModal = () => setEditModalOpened(false);

  const [selectedMenu, setSelectedMenu] = useState(null);
  const handleSelectMenu = (menu) => {
    const isSelectedMenu = selectedMenu && selectedMenu.id === menu.id;
    setSelectedMenu(isSelectedMenu ? null : menu);
    console.log(selectedMenu.id);
  };

  return (
    <div className="bigContainer">
      <AddModal
          isOpened={addModalOpened}
          openModal={openAddModal}
          closeModal={closeAddModal}
          menus={menus}
          addMenu={addMenu}
          setSelectedMenu={setSelectedMenu}
        />
      {selectedMenu && (<EditModal
          isOpened={editModalOpened}
          openModal={openEditModal}
          closeModal={closeEditModal}
          menus={menus}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          />)}
      <div className="container">
        <Table
          menus={menus}
          selectedMenu={selectedMenu}
          handleSelectMenu={handleSelectMenu}
          enteredSearch={enteredSearch}
        />
        <AddButton openModal={openAddModal}/>
      </div>
      {selectedMenu && (
        <DetailView
          selectedMenu={selectedMenu}
          closeView={handleSelectMenu}
          openModal={openEditModal}
        />
      )}
    </div>
  );
};

export default List;
