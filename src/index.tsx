import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserContextProvider } from "./Contexts/user-context";
import { BrowserRouter } from "react-router-dom";
import { SearchContextProvider } from "./Contexts/search-context";
import { MenuContextProvider } from "./Contexts/menu-context";
import { ModalContextProvider } from "./Contexts/modal-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <ModalContextProvider>
        <SearchContextProvider>
          <MenuContextProvider>
          <ToastContainer autoClose={3000} position="top-right" pauseOnHover />
            <App />
          </MenuContextProvider>
        </SearchContextProvider>
      </ModalContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
