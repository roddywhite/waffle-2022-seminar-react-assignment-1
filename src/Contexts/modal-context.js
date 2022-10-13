import { createContext, useState } from "react";

const ModalContext = createContext({
  deleteModalOpened: false,
  onOpenDeleteModal: () => {},
  onCloseDeleteModal: () => {},
});

export const ModalContextProvider = (props) => {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const openDeleteModal = () => setDeleteModalOpened(true);
  const closeDeleteModal = () => setDeleteModalOpened(false);

  return (
    <ModalContext.Provider
      value={{
        deleteModalOpened: deleteModalOpened,
        onOpenDeleteModal: openDeleteModal,
        onCloseDeleteModal: closeDeleteModal,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
