import { useContext } from "react";

import starEmpty from "../assets/starEmpty.svg";
import starHalf from "../assets/starHalf.svg";
import starFull from "../assets/starFull.svg";

import "./StoreShortcut.css";
import UserContext from "../Contexts/user-context";

const StoreShortcut = () => {
  const userCtx = useContext(UserContext);
  const { owners } = userCtx;
  return (
    <>
      {owners && (
        <div className="storeBox">
          <label>와플천국</label>
          <span>{owners[1].username}</span>
          <a>이 가게엔 슬픈 전설이 있습니다다다다다다다다다</a>
          <img className="star" src={starFull}></img>
        </div>
      )}
    </>
  );
};

export default StoreShortcut;

// n.5면 n개만큼 꽉별, 1로 나눠떨어지면 5-n만큼 빈별, 안나눠지면 1개만큼 반별 4-n만큼 빈별
