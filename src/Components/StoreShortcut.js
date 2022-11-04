import { useState, useContext, useEffect } from "react";
import axios from "axios";

import starEmpty from "../assets/starEmpty.svg";
import starHalf from "../assets/starHalf.svg";
import starFull from "../assets/starFull.svg";

import "./StoreShortcut.css";
import UserContext from "../Contexts/user-context";
import MenuContext from "../Contexts/menu-context";

const StoreShortcut = ({ storeId, storeName, ownerName, storeDesc }) => {
  const [rating, setRating] = useState(0);
  const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";
  const storeRatingCalculator = () => {
    let sum = 0;
    let count = 0;
    let menuList = [];
    let reviewList = [];
    axios.get(`${end}/menus/?owner=${storeId}`).then((res) => {
      menuList = res.data.data;
      menuList.forEach((m) => {
        axios.get(`${end}/reviews/?menu=${m?.id}`).then((res) => {
          reviewList = res.data.data;
          reviewList.forEach((r) => {
            sum += r?.rating;
            count += 1;
            setRating((sum / count).toFixed(2));
          });
        });
      });
    });
  };
  useEffect(() => storeRatingCalculator(), []);

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

// n.5면 n개만큼 꽉별, 1로 나눠떨어지면 5-n만큼 빈별, 안나눠지면 1개만큼 반별 4-n만큼 빈별
