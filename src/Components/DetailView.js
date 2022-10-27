import { useState, useContext, useEffect, useRef, useCallback } from "react";
import UserContext from "../Contexts/user-context";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

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

const DetailView = () => {
  const userCtx = useContext(UserContext);
  const menuCtx = useContext(MenuContext);
  const modalCtx = useContext(ModalContext);
  const end = "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com";

  const navigate = useNavigate();
  const { storeId, menuId } = useParams();
  const [menu, setMenu] = useState(
    menuCtx.findMenuById(menuCtx.entireMenus, Number(menuId))
  );
  const [nextLoad, setNextLoad] = useState(null);
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
      setMenuRating(Math.round((2 * ratingSum) / reviewList.length) / 2);
    });
  };
  useEffect(() => fetchReviewData(), []);

  const fetchFirstReviews = () => {
    axios.get(`${end}/reviews/?count=6&menu=${menuId}`).then((res) => {
      setReviews(res.data.data);
      setNextLoad(res.data.next);
    });
  };
  useEffect(() => fetchFirstReviews(), []);

  const fetchMoreReview = () => {
    axios
      .get(`${end}/reviews/?from=${nextLoad}&count=6&menu=${menuId}`)
      .then((res) => {
        setIsLoading(true);
        const reviewList = res.data.data;
        setReviews((prev) => [...prev, ...reviewList]);
        setNextLoad(res.data.next);
        setIsLoading(false);
      });
  };

  const [target, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef(null);

  // const onIntersect = async ([entry], observer) => {
  //   if (entry.isIntersecting && !isLoading) {
  //     observer.unobserve(target)
  //     setIsLoading(true);
  //     await fetchMoreReview();
  //     setIsLoading(false);
  //     observer.observe(target)
  //   }
  // };

  // useEffect(() => {
  //   let observer;
  //   if (target) {
  //     observer = new IntersectionObserver(onIntersect, {
  //       // rootMargin: '30%',
  //       threshold: 0.1,
  //     });
  //     observer.observe(target);
  //   }
  //   return () => observer && observer.disconnect();
  // }, [target]);

  return (
    <>
      {!menu && <NotFound />}
      {menu && (
        <>
          <Header />
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
                          x <= menuRating
                            ? starFull
                            : x - 0.5 === menuRating
                            ? starHalf
                            : starEmpty
                        }
                      />
                    );
                  })}
                </div>
                <a>{reviews?.length ? menuRating : "아직 리뷰가 없습니다"}</a>
              </div>
              <div className="reviewList" id="reviewContainer">
                {reviews &&
                  reviews.map((review) => (
                    <Review
                      key={review.id}
                      menuId={menuId}
                      reviewId={review.id}
                      author={review.author}
                      content={review.content}
                      createdAt={review.created_at}
                      rating={review.rating}
                      fetchReviewData={fetchReviewData}
                    />
                  ))}
                <button onClick={fetchMoreReview}>load more</button>
              </div>
              <div ref={setTarget} />
              {isLoading && <p>Loading...</p>}
              <AddReview menuId={menuId} fetchReviewData={fetchReviewData} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailView;
