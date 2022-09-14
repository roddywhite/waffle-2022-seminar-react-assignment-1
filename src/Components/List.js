import "./List.css";

import { useState, useEffect } from "react";

import Table from "./Table";
import AddModal from "./AddModal";
import AddButton from "./AddButton";

const List = ({ menus, addMenu, enteredSearch }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  const [selectedRow, setSelectedRow] = useState(-1);
  const handleRowClicked = (e) => {
      e.preventDefault();
      const id = e.target.parentElement.id;
      setSelectedRow(id);
      console.log(e.target.parentElement);
      console.log(selectedRow);
  };

  return (
    <div className="container">
      <Table
        menus={menus}
        selectedRow={selectedRow}
        handleRowClicked={handleRowClicked}
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
  );
};

export default List;
