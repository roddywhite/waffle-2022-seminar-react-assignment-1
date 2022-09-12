import "./Header.css";
import logo from '../assets/logo.svg';

const Header = (props) => {
  return (
    <div className='header'>
      <a href="https://wafflestudio.com">
        <img className="logo" src={logo} alt="waffle logo" />
      </a>
      <a className="title" href="https://wafflestudio.com">
        <h1>와플스튜디오 메뉴 관리</h1>
      </a>
    </div>
  );
};

export default Header;
