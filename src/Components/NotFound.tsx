import { Link } from "react-router-dom";
import Header from "./Header";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="full">
        <div className="notFoundContainer">
          <h2>Page Not Found</h2>
          <Link to="/">
            <button>홈으로 이동하기</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
