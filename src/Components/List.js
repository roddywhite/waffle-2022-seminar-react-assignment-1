import "./List.css";

import { useState, useEffect } from "react";

import Table from "./Table";
import AddModal from "./AddModal";
import AddButton from "./AddButton";
import DetailView from "./DetailView";

const List = ({ menus, addMenu, enteredSearch }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  const [selectedMenu, setSelectedMenu] = useState(null);
  const handleSelectMenu = (menu) => {
    const isSelectedMenu = selectedMenu && selectedMenu.id === menu.id;
    setSelectedMenu(isSelectedMenu ? null : menu);

  };

  return (
    <div className='bigContainer'>
    <div className="container">
      <Table
        menus={menus}
        selectedMenu={selectedMenu}
        handleSelectMenu={handleSelectMenu}
        enteredSearch={enteredSearch}
      ></Table>
      <AddButton openModal={openModal}></AddButton>
      <AddModal
        isOpened={modalOpened}
        openModal={openModal}
        closeModal={closeModal}
        addMenu={addMenu}
      ></AddModal>
    </div>
    <DetailView></DetailView>
    </div>
  );
};

export default List;
