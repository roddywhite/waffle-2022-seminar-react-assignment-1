import { createContext, useState } from "react";

const ModalContext = createContext({
  deleteMenuOpened: false,
  onOpenDeleteMenu: () => {},
  onCloseDeleteMenu: () => {},
  deleteReviewOpened: false,
  onOpenDeleteReview: ()=>{},
  onCloseDeleteReview: ()=>{}
});

export const ModalContextProvider = (props) => {
  const [deleteMenuOpened, setDeleteMenuOpened] = useState(false);
  const openDeleteMenu = () => setDeleteMenuOpened(true);
  const closeDeleteMenu = () => setDeleteMenuOpened(false);

  const [deleteReviewOpened, setDeleteReviewOpened] = useState(false);
  const openDeleteReview = () => setDeleteReviewOpened(true);
  const closeDeleteReview = () => setDeleteReviewOpened(false);

  return (
    <ModalContext.Provider
      value={{
        deleteMenuOpened: deleteMenuOpened,
        onOpenDeleteMenu: openDeleteMenu,
        onCloseDeleteMenu: closeDeleteMenu,
        deleteReviewOpened: deleteReviewOpened,
        onOpenDeleteReview: openDeleteReview,
        onCloseDeleteReview: closeDeleteReview,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
