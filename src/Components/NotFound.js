import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h3>Page Not Found</h3>
      <Link to="/">
        <button>홈으로 이동하기</button>
      </Link>
    </>
  );
};

export default NotFound;