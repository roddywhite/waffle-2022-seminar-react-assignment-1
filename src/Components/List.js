import "./List.css";

import { useEffect, useState } from "react";

import Table from "./Table";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import AddButton from "./AddButton";
import DetailView from "./DetailView";

const List = ({ menus, setMenus, addMenu, enteredSearch }) => {
  const [addModalOpened, setAddModalOpened] = useState(false);
  const openAddModal = () => setAddModalOpened(true);
  const closeAddModal = () => setAddModalOpened(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const openEditModal = () => setEditModalOpened(true);
  const closeEditModal = () => setEditModalOpened(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const openDeleteModal = () => setDeleteModalOpened(true);
  const closeDeleteModal = () => setDeleteModalOpened(false);

  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleSelectMenu = (menu) => {
    const isSelectedMenu = selectedMenu && menu.id === selectedMenu.id;
    setSelectedMenu(() => (isSelectedMenu ? null : menu));
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
      {selectedMenu && (
        <EditModal
          isOpened={editModalOpened}
          openModal={openEditModal}
          closeModal={closeEditModal}
          menus={menus}
          setMenus={setMenus}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      )}
      <DeleteModal
        isOpened={deleteModalOpened}
        openModal={openDeleteModal}
        closeModal={closeDeleteModal}
        menus={menus}
        setMenus={setMenus}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <div className="container">
        <Table
          menus={menus}
          selectedMenu={selectedMenu}
          handleSelectMenu={handleSelectMenu}
          enteredSearch={enteredSearch}
        />
        <AddButton openModal={openAddModal} />
      </div>
      {selectedMenu && (
        <DetailView
          selectedMenu={selectedMenu}
          closeView={handleSelectMenu}
          openEditModal={openEditModal}
          openDeleteModal={openDeleteModal}
        />
      )}
    </div>
  );
};

export default List;
