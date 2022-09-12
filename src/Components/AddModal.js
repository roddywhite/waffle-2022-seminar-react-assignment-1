import "./AddModal.css";
import "./AddButton";
import { useEffect, useState, useRef } from "react";

const AddModal = ({ isOpened, openModal, closeModal, addMenu }) => {
  // 이름, 이미지url State 만들기
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredUrl, setEnteredUrl] = useState("");

  const titleChangeHandler = (e) => setEnteredTitle(e.target.value);
  const urlChangeHandler = (e) => setEnteredUrl(e.target.value);

  // 숫자 세 자리마다 콤마 넣기 (콤마로 바꿔주는 과정에서 price State도 update)
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredNum, setEnteredNum] = useState("");
  const changeEnteredNum = (e) => {
    const value = e.target.value;
    setEnteredPrice(value);
    const removedCommaValue = Number(value.replaceAll(",", ""));
    setEnteredNum(removedCommaValue.toLocaleString());
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newMenu = {
      id: 0,
      name: enteredTitle,
      price: enteredPrice,
      image: enteredUrl,
    };

    addMenu(newMenu);
    setEnteredTitle("");
    setEnteredPrice("");
    setEnteredNum("");
    setEnteredUrl("");
    closeModal();
  };


  const addModalRef = useRef();
  useEffect( () => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const handleClickOutside = (e) => {
    !addModalRef.current.contains(e.target) ? closeModal() : openModal();
  }


  /*
  const closeModalOutside = (e) => {
    console.log(e.target);
    console.log(e.currentTarget);
    if (e.target === e.currentTarget) closeModal();
  };
  */

  return (
      <div
        id="modal-animation"
        className={isOpened ? "openModal" : "closedModal"}
        ref={addModalRef}
        value={isOpened}
      >
        <h3 className="modalTitle">메뉴 추가</h3>
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
            추가
          </button>
          <button className="button" onClick={closeModal}>
            취소
          </button>
        </div>
      </div>

  );
};

export default AddModal;
