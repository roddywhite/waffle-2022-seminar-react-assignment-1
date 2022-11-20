import { createContext, useState } from "react";

const ModalContext = createContext({
  deleteMenuOpened: false,
  onOpenDeleteMenu: () => {},
  onCloseDeleteMenu: () => {},
  deleteReviewOpened: false,
  onOpenDeleteReview: ()=>{},
  onCloseDeleteReview: ()=>{}
});

export const ModalContextProvider = (props: any) => {
  const [deleteMenuOpened, setDeleteMenuOpened] = useState(false);
  const openDeleteMenu = (): void => setDeleteMenuOpened(true);
  const closeDeleteMenu = (): void => setDeleteMenuOpened(false);

  const [deleteReviewOpened, setDeleteReviewOpened] = useState(false);
  const openDeleteReview = (): void => setDeleteReviewOpened(true);
  const closeDeleteReview = (): void => setDeleteReviewOpened(false);

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
