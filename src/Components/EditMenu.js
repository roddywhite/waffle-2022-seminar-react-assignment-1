import "./AddMenu.css";
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MenuContext from "../Contexts/menu-context";

import Header from "./Header";

const EditMenu = () => {
  const navigate = useNavigate();
  const menuCtx = useContext(MenuContext);
  const selectedMenu = menuCtx.selectedMenu;

  // 이미지url, 설명 State 만들기
  const [enteredUrl, setEnteredUrl] = useState(selectedMenu.image);
  const [enteredDesc, setEnteredDesc] = useState(selectedMenu.description);

  useEffect(() => setEnteredUrl(selectedMenu.image), [selectedMenu]);
  useEffect(() => setEnteredDesc(selectedMenu.description), [selectedMenu]);

  // 숫자 세 자리마다 콤마 넣기 (콤마로 바꿔주는 과정에서 price State도 update)
  const [enteredPrice, setEnteredPrice] = useState(selectedMenu.price);
  const [enteredNum, setEnteredNum] = useState(
    selectedMenu.price.toLocaleString()
  );

  const changeEnteredNum = (e) => {
    const value = e.target.value;
    const removedCommaValue = Number(value.replaceAll(",", ""));
    setEnteredPrice(removedCommaValue);
    setEnteredNum(removedCommaValue.toLocaleString());
  };

  useEffect(
    () => setEnteredNum(selectedMenu.price.toLocaleString()),
    [selectedMenu]
  );

  // 수정 취소할 때 입력값 초기화
  const resetEntered = () => {
    setEnteredPrice(selectedMenu.price);
    setEnteredNum(selectedMenu.price.toLocaleString());
    setEnteredUrl(selectedMenu.image);
    setEnteredDesc(selectedMenu.description);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (enteredPrice === "") {
      window.alert("가격을 입력해주세요.");
    } else if (enteredNum.slice(-1) !== "0") {
      window.alert("가격은 10원 단위로만 입력해주세요.");
    } else {
      const editedMenu = {
        id: selectedMenu.id,
        name: selectedMenu.name,
        type: selectedMenu.type,
        price: enteredPrice,
        image: enteredUrl,
        description: enteredDesc,
      };

      menuCtx.onEditMenu(editedMenu);
      resetEntered();
      navigate(-1);
    }
  };

  const cancelHandler = () => {
    resetEntered();
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className="addEditContainer">
        <h3 className="modalTitle">메뉴 수정</h3>
        <div className="inputCon">
          <label className="label">이름</label>
          <a>{selectedMenu.name}</a>
        </div>
        <div className="inputCon">
          <label className="label">종류</label>
          <a>{selectedMenu.type}</a>
        </div>

          <label className="label">가격</label>
          <input
            className="inputBox"
            type="text"
            maxLength="7"
            placeholder="5,000"
            value={enteredNum}
            onChange={changeEnteredNum}
          />


          <label className="label">상품 이미지</label>
          <input
            className="inputBox"
            type="text"
            placeholder="https://foobar/baz.png"
            value={enteredUrl}
            onChange={(e) => setEnteredUrl(e.target.value)}
          />


          <label className="label">설명</label>
          <input
            className="inputBox"
            type="text"
            placeholder="상품에 대한 자세한 설명을 입력해주세요"
            value={enteredDesc}
            onChange={(e) => setEnteredDesc(e.target.value)}
          />

        <div className="buttonCon">
          <button className="greenButton" onClick={submitHandler}>
            저장
          </button>
          <button className="button" onClick={cancelHandler}>
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default EditMenu;
