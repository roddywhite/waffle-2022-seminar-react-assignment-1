import { Link } from "react-router-dom";
import Header from "./Header";
import SearchStore from "./SearchStore";
import StoreShortcut from "./StoreShortcut";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Header />
      <SearchStore />
      <div className="bigContainer">
        <div className="homeContainer">
          <Link to='/stores/1'>
            <StoreShortcut />
          </Link>
          <StoreShortcut />
          <StoreShortcut />
          <StoreShortcut />
          <StoreShortcut />
          <StoreShortcut />
          <StoreShortcut />
          <StoreShortcut />
        </div>
      </div>
    </div>
  );
};

export default Home;
