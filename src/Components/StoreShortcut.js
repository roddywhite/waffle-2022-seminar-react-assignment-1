import { useState, useEffect } from "react";
import axios from "axios";
import { end, errMsg } from "../utils/common";
import starEmpty from "../assets/starEmpty.svg";
import starHalf from "../assets/starHalf.svg";
import starFull from "../assets/starFull.svg";
import "./StoreShortcut.css";

const StoreShortcut = ({ storeId, storeName, ownerName, storeDesc }) => {
  const [rating, setRating] = useState(0);

  const getRating = () => {
    axios
      .get(`${end}/owners/${storeId}`)
      .then((res) => {
        setRating(res.data.owner.rating.toFixed(2));
      })
      .catch((res) => {
        errMsg(res.response.data.message);
      });
  };
  useEffect(() => getRating(), []);

  return (
    <>
      <div className="storeBox">
        <label>{storeName}</label>
        <span>{ownerName}</span>
        <a>{storeDesc}</a>
        <a className="rating">평점: {rating}</a>
        <div className="starBox">
          {[1, 2, 3, 4, 5].map((x) => {
            return (
              <img
                className="star"
                src={
                  Math.round(rating) < 2 * x - 1
                    ? starEmpty
                    : Math.round(rating) < 2 * x
                    ? starHalf
                    : starFull
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default StoreShortcut;
