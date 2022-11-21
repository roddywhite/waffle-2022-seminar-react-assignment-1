import { useState, useContext, useEffect, useRef, useCallback } from "react";
import UserContext from "../Contexts/user-context";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { end, errMsg, successMsg } from "../utils/common";
import "./DetailView.css";

import NotFound from "./NotFound";
import DeleteMenuModal from "./DeleteMenuModal";
import Review from "./Review";
import AddReview from "./AddReview";
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
  const modalCtx = useContext(ModalContext);

  const navigate = useNavigate();
  const { storeId, menuId } = useParams<{
    storeId?: string;
    menuId?: string;
  }>();
  const [menu, setMenu] = useState<menu | null>(null);
  const [reviews, setReviews] = useState<Array<review>>([]);
  const [menuRating, setMenuRating] = useState<number>(0);
  const nextLoad = useRef<string>("");

  // 메뉴 최신정보 불러오기
  const fetchLatestData = (): void => {
    axios.get(`${end}/menus/${menuId}`).then((res) => {
      setMenu(res.data);
      setMenuRating(res.data.rating);
    });
  };
  useEffect(() => fetchLatestData(), []);

  // 처음 리뷰 6개 불러오기
  const fetchFirstReviews = (): void => {
    axios.get(`${end}/reviews/?count=6&menu=${menuId}`).then((res) => {
      nextLoad.current = res.data.next;
      setReviews(res.data.data);
    });
  };
  useEffect(() => fetchFirstReviews(), []);

  // const fetchMoreReview = (): void => {
  //   axios
  //     .get(`${end}/reviews/?from=${nextLoad.current}&count=6&menu=${menuId}`)
  //     .then((res) => {
  //       if (res.data.data[0]) {
  //         const reviewList = res.data.data;
  //         setReviews((prev) => [...prev, ...reviewList]);
  //         nextLoad.current = res.data.next;
  //       } else {
  //         errMsg("더이상 불러올 리뷰가 없습니다");
  //       }
  //     });
  // };

  // 무한스크롤 구현
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const reviewContainer = useRef<HTMLDivElement | null>(null);
  const isFetching = useRef<boolean>(false);
  const stopLoad = useRef<boolean>(false);
  // 리뷰 추가, 수정, 삭제시 다시 스크롤 내릴 수 있도록
  const noStop = (): void => {
    stopLoad.current = false;
    nextLoad.current = "";
  };

  const moreData = useCallback(async () => {
    isFetching.current = true;
    const res = await axios.get(
      `${end}/reviews/?from=${nextLoad.current}&count=6&menu=${menuId}`
    );
    if (res.data.data[0]) {
      const reviewList: review[] = res.data.data;
      setReviews((prev) => [...prev, ...reviewList]);
      nextLoad.current = res.data.next;
    } else {
      stopLoad.current = true;
    }
    isFetching.current = false;
  }, [])

  const onIntersect = async ([entry]: any, observer: any) => {
    if (entry.isIntersecting && !isFetching.current && !stopLoad.current) {
      observer.unobserve(target);
      await moreData();
      observer.observe(target);
    }
  };

  useEffect(() => {
    let observer: any;
    if (target && !stopLoad.current) {
      observer = new IntersectionObserver(onIntersect, {
        root: reviewContainer.current,
        threshold: 1,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, reviews, stopLoad.current]);

  console.log(nextLoad.current, stopLoad.current)

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
                  onError={(e) => ((e.target as HTMLImageElement).src = altImg)}
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

                {(userCtx.user as user | null)?.id === Number(storeId) && (
                  <div>
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
                <a>{reviews?.length ? menuRating.toFixed(2) : "0.00"}</a>
              </div>
              <div className="reviewList" ref={reviewContainer}>
                {reviews &&
                  reviews.map((review: review, idx) => (
                    <Review
                      key={idx}
                      reviewId={review.id}
                      author={review.author}
                      content={review.content}
                      createdAt={review.created_at}
                      rating={review.rating}
                      fetchLatestData={fetchLatestData}
                      fetchFirstReviews={fetchFirstReviews}
                      noStop={noStop}
                    />
                  ))}
                <button className="loadMore">
                  {!stopLoad ? "Load more..." : "더이상 불러올 리뷰가 없습니다"}
                </button>
                <div className="loader" ref={setTarget} />
                {!stopLoad && <a>Loading...</a>}
              </div>
              <AddReview
                menuId={menuId}
                fetchLatestData={fetchLatestData}
                fetchFirstReviews={fetchFirstReviews}
                noStop={noStop}
                reviewContainer={reviewContainer}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailView;
