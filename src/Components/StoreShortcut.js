import { useContext } from "react";

import starEmpty from "../assets/starEmpty.svg";
import starHalf from "../assets/starHalf.svg";
import starFull from "../assets/starFull.svg";

import "./StoreShortcut.css";
import UserContext from "../Contexts/user-context";

const StoreShortcut = ({ storeName, ownerName, storeDesc }) => {
  return (
    <>
        <div className="storeBox">
          <label>{storeName}</label>
          <span>{ownerName}</span>
          <a>{storeDesc}</a>
          <img className="star" src={starFull}></img>
        </div>
    </>
  );
};

export default StoreShortcut;

// n.5면 n개만큼 꽉별, 1로 나눠떨어지면 5-n만큼 빈별, 안나눠지면 1개만큼 반별 4-n만큼 빈별
