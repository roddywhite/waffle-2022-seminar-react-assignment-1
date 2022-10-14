import "./AddMenu.css";
import "./AddButton";
import { useState, useContext } from "react";
import MenuContext from "../Contexts/menu-context";
import { useNavigate } from "react-router-dom";

import Header from "./Header";

const AddMenu = () => {
  const menuCtx = useContext(MenuContext);
  const navigate = useNavigate();
  const { selectedMenu } = menuCtx;

  // 이름, 종류, 이미지url, 설명 State 만들기
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredType, setEnteredType] = useState("");
  const [enteredUrl, setEnteredUrl] = useState("");
  const [enteredDesc, setEnteredDesc] = useState("");

  // 한글만 입력받도록
  const titleChangeHandler = (e) => {
    const koreanOnly = e.target.value.replace(
      /[a-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,
      ""
    );
    setEnteredTitle(koreanOnly);
  };

  // 숫자 세 자리마다 콤마 넣기 (콤마로 바꿔주는 과정에서 price State도 update)
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredNum, setEnteredNum] = useState("");
  const changeEnteredNum = (e) => {
    const value = e.target.value;
    const removedCommaValue = Number(value.replaceAll(",", ""));
    setEnteredPrice(removedCommaValue);
    setEnteredNum(removedCommaValue.toLocaleString());
  };

  const isNameExist = (enteredTitle) => {
    const menusNameArr = menuCtx.menus.map((menu) => menu.name);
    return menusNameArr.includes(enteredTitle);
  };

  // 취소할 때 입력값 초기화
  const resetEntered = () => {
    setEnteredTitle("");
    setEnteredType("");
    setEnteredPrice("");
    setEnteredNum("");
    setEnteredUrl("");
    setEnteredDesc("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const regex = /^[ㄱ-ㅎ|가-힣]+$/;
    if (enteredTitle === "") {
      window.alert("메뉴명을 입력해주세요.");
    } else if (!regex.test(enteredTitle)) {
      window.alert("메뉴명은 한글로만 입력해주세요.");
    } else if (isNameExist(enteredTitle)) {
      window.alert("해당 메뉴명이 이미 존재합니다.");
    } else if (enteredPrice === "") {
      window.alert("가격을 입력해주세요.");
    } else if (enteredNum.slice(-1) !== "0") {
      window.alert("가격은 10원 단위로만 입력해주세요.");
    } else if (enteredType === "") {
      window.alert("종류를 지정해주세요");
    } else {
      const newMenu = {
        id: 0,
        name: enteredTitle,
        type: enteredType,
        price: enteredPrice,
        image: enteredUrl,
        description: enteredDesc,
      };

      menuCtx.onAddMenu(newMenu);
      resetEntered();
      navigate(-1);
    }
  };

  const cancelHandler = () => {
    resetEntered();
    navigate(-1);
  };

  return (
    <div className='full'>
      <Header />
      <div className="addContainer">
        <h3 className="title">새 메뉴 추가</h3>

          <label className="inputLabel">이름</label>
          <input
            className="inputBox"
            type="text"
            minLength="1"
            maxLength="20"
            placeholder="맛있는와플"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />


          <label className="inputLabel">종류</label>
          <select
            name="type"
            className="dropdown"
            onChange={(e) => setEnteredType(e.target.value)}
          >
            <option value="">상품의 종류를 선택하세요</option>
            <option value="와플">와플</option>
            <option value="음료">음료</option>
            <option value="커피">커피</option>
          </select>


          <label className="inputLabel">가격</label>
          <input
            className="inputBox"
            type="text"
            maxLength="7"
            placeholder="5,000"
            value={enteredNum}
            onChange={changeEnteredNum}
          />


          <label className="inputLabel">상품 이미지</label>
          <input
            className="inputBox"
            type="text"
            placeholder="https://foobar/baz.png"
            value={enteredUrl}
            onChange={(e) => setEnteredUrl(e.target.value)}
          />


          <label className="inputLabel">설명</label>
          <input
            className="inputBoxDesc"
            type="text"
            placeholder="상품에 대한 자세한 설명을 입력해주세요"
            value={enteredDesc}
            onChange={(e) => setEnteredDesc(e.target.value)}
          />

        <div className="buttonCon">
          <button className="greenButton" onClick={submitHandler}>
            추가
          </button>
          <button className="button" onClick={cancelHandler}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;