import "./List.css";

import { useState } from "react";

import Table from "./Table";
import AddModal from "./AddModal";
import AddButton from "./AddButton";




const List = ({ menus, addMenu }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  return (
    <div className="container">
      <Table menus={menus}></Table>
      <AddButton openModal={openModal}></AddButton>
      <AddModal isOpened={modalOpened} openModal={openModal} closeModal={closeModal} addMenu={addMenu}></AddModal>
    </div>
  );
};

export default List;
