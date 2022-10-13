import { createContext, useState } from "react";

const ModalContext = createContext({
    addModalOpened: false,
    deleteModalOpened: false,
    onOpenAddModal: ()=>{},
    onCloseAddModal: ()=>{},
    onOpenDeleteModal: ()=>{},
    onCloseDeleteModal: ()=>{},
});

export const ModalContextProvider = (props) => {
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const openAddModal = () => setAddModalOpened(true);
  const closeAddModal = () => setAddModalOpened(false);
  const openDeleteModal = () => setDeleteModalOpened(true);
  const closeDeleteModal = () => setDeleteModalOpened(false);

  return (
    <ModalContext.Provider
      value={{
        addModalOpened: addModalOpened,
        deleteModalOpened: deleteModalOpened,
        onOpenAddModal: openAddModal,
        onCloseAddModal: closeAddModal,
        onOpenDeleteModal: openDeleteModal,
        onCloseDeleteModal: closeDeleteModal,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
