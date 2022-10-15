import { Link } from "react-router-dom";
import Header from "./Header";
import Search from "./Search";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Header />
      <Search />
      <div className="bigContainer">
        <div className="homeContainer">
          <a>TODO: 여기는 가게 목록을 만들 예정</a>
          <Link to="/stores/1">
            <button>Store1로 바로가기</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
