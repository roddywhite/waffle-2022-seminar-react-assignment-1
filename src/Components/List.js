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
import ModalContext from "../Contexts/modal-context";

const List = () => {

  const menuCtx = useContext(MenuContext);
  const userCtx = useContext(UserContext);
  const modalCtx = useContext(ModalContext);

  return (
    <div className="bigContainer">
      <AddModal/>
      {/* {menuCtx.selectedMenu && (
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
        {userCtx.isLoggedIn && <AddButton openModal={modalCtx.onOpenAddModal} />}
      </div>
      {menuCtx.selectedMenu && <SelectedView />}
    </div>
  );
};

export default List;
