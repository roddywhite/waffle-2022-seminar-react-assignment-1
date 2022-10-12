import "./List.css";

import { useEffect, useState, useContext } from "react";
import UserContext from "../Contexts/user-context";
import MenuContext from "../Contexts/menu-context";

import Table from "./Table";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import AddButton from "./AddButton";
import SelectedView from "./SelectedView";

const List = ({ menus, setMenus, addMenu }) => {
  const [addModalOpened, setAddModalOpened] = useState(false);
  const openAddModal = () => setAddModalOpened(true);
  const closeAddModal = () => setAddModalOpened(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const openEditModal = () => setEditModalOpened(true);
  const closeEditModal = () => setEditModalOpened(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const openDeleteModal = () => setDeleteModalOpened(true);
  const closeDeleteModal = () => setDeleteModalOpened(false);

  const menuCtx = useContext(MenuContext);

  return (
    <div className="bigContainer">
      {/* <AddModal
        isOpened={addModalOpened}
        openModal={openAddModal}
        closeModal={closeAddModal}
        menus={menus}
        addMenu={addMenu}
        setSelectedMenu={setSelectedMenu}
      />
      {menuCtx.selectedMenu && (
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
      /> */}

      <div className="container">
        <Table />
        {/* <AddButton openModal={openAddModal} /> */}
      </div>
      {menuCtx.selectedMenu && <SelectedView />}
    </div>
  );
};

export default List;
