import "./AddModal.css";
import { useEffect, useState, useRef } from "react";

const EditModal = ({
  isOpened,
  openModal,
  closeModal,
  menus,
  selectedMenu,
  setSelectedMenu,
}) => {
  // 이름, 이미지url State 만들기
  const [enteredTitle, setEnteredTitle] = useState(selectedMenu.name);
  const [enteredUrl, setEnteredUrl] = useState(selectedMenu.image);

  const titleChangeHandler = (e) => setEnteredTitle(e.target.value);
  const urlChangeHandler = (e) => setEnteredUrl(e.target.value);

  // 숫자 세 자리마다 콤마 넣기 (콤마로 바꿔주는 과정에서 price State도 update)
  const [enteredPrice, setEnteredPrice] = useState(selectedMenu.price);
  const [enteredNum, setEnteredNum] = useState('');
  const changeEnteredNum = (e) => {
    const value = e.target.value + "0";
    setEnteredPrice(value);
    const removedCommaValue = Number(value.replaceAll(",", ""));
    setEnteredNum(removedCommaValue.toLocaleString());
  };

  const isNameExist = (enteredTitle) => {
    const menusNameArr = menus.map((menu) => menu.name);
    return menusNameArr.includes(enteredTitle);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newMenu = {
      id: selectedMenu.id,
      name: enteredTitle,
      price: enteredPrice,
      image: enteredUrl,
    };
    if (enteredTitle === "") {
      window.alert("메뉴명을 입력해주세요.");
    } else if (isNameExist(enteredTitle)) {
      window.alert("해당 메뉴명이 이미 존재합니다.");
    } else if (enteredPrice === "") {
      window.alert("가격을 입력해주세요.");
    } else {

      
      setEnteredTitle("");
      setEnteredPrice("");
      setEnteredNum("");
      setEnteredUrl("");
      closeModal();

      setSelectedMenu(newMenu);
    }
  };

  const editModalRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e) => {
    !editModalRef.current.contains(e.target) ? closeModal() : openModal();
  };


  return (
    <div className={isOpened ? "openModalContainer" : "closedModalContainer"}>
      <div
        id="modal-animation"
        className={isOpened ? "openModal" : "closedModal"}
        ref={editModalRef}
        value={isOpened}
      >
        <h3 className="modalTitle">메뉴 수정</h3>
        <div className="inputCon">
          <label className="label">이름</label>
          <input
            className="inputBox"
            type="text"
            minLength="1"
            maxLength="20"
            placeholder="맛있는와플"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="inputCon">
          <label className="label">가격</label>
          <input
            className="inputBox"
            type="text"
            maxLength="7"
            placeholder="5,000"
            value={enteredNum}
            onChange={changeEnteredNum}
          />
        </div>
        <div className="inputCon">
          <label className="label">상품 이미지</label>
          <input
            className="inputBox"
            type="text"
            placeholder="https://foobar/baz.png"
            value={enteredUrl}
            onChange={urlChangeHandler}
          />
        </div>
        <div className="buttonCon">
          <button className="greenButton" onClick={submitHandler}>
            저장
          </button>
          <button className="button" onClick={closeModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
