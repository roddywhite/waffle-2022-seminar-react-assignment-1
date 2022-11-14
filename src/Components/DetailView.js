import { useState, useContext, useEffect, useRef, useCallback } from "react";
import UserContext from "../Contexts/user-context";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { end, errMsg, successMsg } from "../utils/common";
import "./DetailView.css";

import Header from "./Header";
import NotFound from "./NotFound";
import DeleteMenuModal from "./DeleteMenuModal";
import Review from "./Review";
import AddReview from "./AddReview";

import MenuContext from "../Contexts/menu-context";
import ModalContext from "../Contexts/modal-context";

import backArrow from "../assets/backArrow.svg";
import editButton from "../assets/editButton.svg";
import deleteButton from "../assets/deleteButton.svg";
import altImg from "../assets/logo.svg";
import starEmpty from "../assets/starEmpty.svg";
import starHalf from "../assets/starHalf.svg";
import starFull from "../assets/starFull.svg";
import HeaderStore from "./HeaderStore";

const DetailView = () => {
  const userCtx = useContext(UserContext);
  const menuCtx = useContext(MenuContext);
  const modalCtx = useContext(ModalContext);

  const navigate = useNavigate();
  const { storeId, menuId } = useParams();
  const [menu, setMenu] = useState(
    menuCtx.findMenuById(menuCtx.entireMenus, Number(menuId))
  );
  // const [nextLoad, setNextLoad] = useState(null);
  const nextLoad = useRef("");
  const [entireReviews, setEntireReviews] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [menuRating, setMenuRating] = useState(0);

  // 메뉴 최신정보 불러오기
  useEffect(() => {
    axios.get(`${end}/menus/${menuId}`).then((res) => {
      setMenu(res.data);
    });
  }, []);

  // 리뷰 데이터 가져오고 평균 별점 계산
  const fetchReviewData = () => {
    axios.get(`${end}/reviews/?menu=${menuId}`).then((res) => {
      const reviewList = res.data.data;
      setEntireReviews([...reviewList]);
      let ratingSum = 0;
      reviewList.forEach((x) => (ratingSum += x.rating));
      setMenuRating((ratingSum / reviewList.length).toFixed(2));
    });
  };
  useEffect(() => fetchReviewData(), []);

  const fetchFirstReviews = () => {
    axios.get(`${end}/reviews/?count=6&menu=${menuId}`).then((res) => {
      nextLoad.current = res.data.next;
      setReviews(res.data.data);
    });
  };
  useEffect(() => fetchFirstReviews(), []);

  const fetchMoreReview = () => {
    axios
      .get(`${end}/reviews/?from=${nextLoad.current}&count=6&menu=${menuId}`)
      .then((res) => {
        if (res.data.data[0]) {
          const reviewList = res.data.data;
          setReviews((prev) => [...prev, ...reviewList]);
          nextLoad.current = res.data.next;
        } else {
          errMsg("더이상 불러올 리뷰가 없습니다");
        }
      });
  };

  // 무한스크롤 구현
  const [target, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef(null);
  const reviewContainer = useRef(null);
  const [stopLoad, setStopLoad] = useState(false);
  const noStop = () => setStopLoad(false);

  const moreData = async () => {
    const res = await axios.get(
      `${end}/reviews/?from=${nextLoad.current}&count=6&menu=${menuId}`
    );
    if (res.data.data[0]) {
      const reviewList = res.data.data;
      setReviews((prev) => [...prev, ...reviewList]);
      nextLoad.current = res.data.next;
    } else {
      setStopLoad(true);
    }
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !stopLoad) {
      observer.unobserve(target);
      await moreData();
      observer.observe(target);
    }
  };

  useEffect(() => {
    let observer;
    if (target && !stopLoad) {
      observer = new IntersectionObserver(onIntersect, {
        root: reviewContainer.current,
        threshold: 1,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, reviews, stopLoad]);

  return (
    <>
      {!menu && <NotFound />}
      {menu && (
        <>
          <HeaderStore />
          <DeleteMenuModal menuId={menuId} />
          <div className="detailView-bigContainer">
            <div className="leftContainer">
              <div className="backContainer">
                <img
                  className="backArrow"
                  src={backArrow}
                  alt="Back"
                  onClick={() => navigate(`/stores/${storeId}`)}
                />
                <a>메뉴 목록</a>
              </div>

              <div className="detailView">
                <img
                  className="menuImg"
                  src={menu.image}
                  onError={(e) => (e.target.src = altImg)}
                />
                <h3>{menu.name}</h3>
                <span>
                  {menu.type === "waffle"
                    ? "와플"
                    : menu.type === "beverage"
                    ? "음료"
                    : menu.type === "coffee"
                    ? "커피"
                    : ""}
                </span>
                <span>{menu.price.toLocaleString()}원</span>
                <span>{menu.description ? menu.description : "설명 없음"}</span>

                {userCtx.user?.id === Number(storeId) && (
                  <div className="viewButtonContainer">
                    <Link to={`/stores/${storeId}/menus/${menuId}/edit`}>
                      <img className="editButton" src={editButton} alt="Edit" />
                    </Link>
                    <img
                      className="deleteButton"
                      onClick={modalCtx.onOpenDeleteMenu}
                      src={deleteButton}
                      alt="Delete"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="rightContainer">
              <div className="starBox">
                <a>평균 별점</a>
                <div>
                  {[1, 2, 3, 4, 5].map((x) => {
                    return (
                      <img
                        src={
                          x <= Math.round(menuRating) / 2
                            ? starFull
                            : x < 1 + Math.round(menuRating) / 2
                            ? starHalf
                            : starEmpty
                        }
                      />
                    );
                  })}
                </div>
                <a>{reviews?.length ? menuRating : "0.00"}</a>
                {reviews?.length ? (
                  <span className="totalReviews">
                    총 {entireReviews?.length}개의 리뷰
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="reviewList" ref={reviewContainer}>
                {reviews &&
                  reviews.map((review, idx) => (
                    <Review
                      key={idx}
                      menuId={menuId}
                      reviewId={review.id}
                      author={review.author}
                      content={review.content}
                      createdAt={review.created_at}
                      rating={review.rating}
                      fetchReviewData={fetchReviewData}
                      fetchFirstReviews={fetchFirstReviews}
                      noStop={noStop}
                    />
                  ))}
                <button className="loadMore" onClick={fetchMoreReview}>
                  {!stopLoad ? "Load more..." : "더이상 불러올 리뷰가 없습니다"}
                </button>
                <div className="loader" ref={setTarget} />
                {!stopLoad && <a>Loading...</a>}
              </div>
              <AddReview
                menuId={menuId}
                fetchReviewData={fetchReviewData}
                fetchFirstReviews={fetchFirstReviews}
                noStop={noStop}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailView;
