import { useState, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";

import "./AddReview.css";
import { end, errMsg, successMsg } from "../utils/common";
import starEmpty from "../assets/starEmpty.svg";
import starHalf from "../assets/starHalf.svg";
import starFull from "../assets/starFull.svg";
import UserContext from "../Contexts/user-context";

interface DetailViewProps {
  menuId?: string,
  fetchLatestData: () => void,
  fetchFirstReviews: () => void,
  noStop: () => void,
  reviewContainer: any
}

const AddReview = ({
  menuId,
  fetchLatestData,
  fetchFirstReviews,
  noStop,
  reviewContainer,
}: DetailViewProps) => {
  const [enteredContent, setEnteredContent] = useState<string>("");
  const [enteredRating, setEnteredRating] = useState<number>(0);
  const userCtx = useContext(UserContext);
  const { authAxios } = userCtx;

  const postReview = (): void => {
    authAxios
      .post(`${end}/reviews`, {
        content: enteredContent,
        rating: enteredRating,
        menu: menuId,
      })
      .then((res) => {
        fetchLatestData();
        fetchFirstReviews();
        noStop();
        setEnteredContent("");
        setEnteredRating(0);
        successMsg("리뷰가 등록되었습니다");
        reviewContainer.current.scrollTo({
          left: 0,
          top: 0,
          behavior: "smooth",
        });
      })
      .catch((res) => {
        errMsg(res.response.data.message);
      });

    // 액세스 토큰 만료시 갱신
    authAxios.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.response.status === 401) {
          userCtx.onRefresh();
          submitHandler();
        }
      }
    );
  };

  const submitHandler = (): void => {
    if (!userCtx.isLoggedIn) {
      errMsg("로그인 해주세요");
    } else if (enteredRating < 1) {
      errMsg("별점을 체크해주세요");
    } else {
      postReview();
    }
  };

  // starChangeMode state를 만들어서 별점을 클릭하고 빠져나가려고 마우스오버만 해도 클릭한 별점이 바뀌는 문제 해결
  const [viewRating, setViewRating] = useState<number>(0);
  const [starChangeMode, setStarChangeMode] = useState<boolean>(false);

  return (
    <div className="addReviewSection">
      <div
        className="starBox"
        onMouseEnter={() => setStarChangeMode(true)}
        onMouseLeave={() => setStarChangeMode(false)}
      >
        {[1, 2, 3, 4, 5].map((x) => {
          return (
            <img
              className="star"
              src={
                !starChangeMode
                  ? enteredRating < 2 * x - 1
                    ? starEmpty
                    : enteredRating < 2 * x
                    ? starHalf
                    : starFull
                  : viewRating < 2 * x - 1
                  ? starEmpty
                  : viewRating < 2 * x
                  ? starHalf
                  : starFull
              }
              onClick={(e) =>
                e.clientX -
                  (e.target as HTMLImageElement).getBoundingClientRect().left <
                10
                  ? setEnteredRating(2 * x - 1)
                  : setEnteredRating(2 * x)
              }
              onMouseEnter={(e) =>
                e.clientX -
                  (e.target as HTMLImageElement).getBoundingClientRect().left <
                10
                  ? setViewRating(2 * x - 1)
                  : setViewRating(2 * x)
              }
              alt="rating"
            />
          );
        })}
      </div>
      <textarea
        className="addReviewContainer"
        placeholder="리뷰를 입력하세요"
        value={enteredContent}
        onChange={(e) => setEnteredContent(e.target.value)}
      />
      <button className="greenBtn" onClick={submitHandler}>
        저장
      </button>
    </div>
  );
};

export default AddReview;
