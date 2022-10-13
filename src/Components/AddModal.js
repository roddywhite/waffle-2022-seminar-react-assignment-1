import "./AddModal.css";
import "./AddButton";
import { useEffect, useState, useRef, useContext } from "react";
import MenuContext from "../Contexts/menu-context";
import ModalContext from "../Contexts/modal-context";


const AddModal = () => {

  const menuCtx = useContext(MenuContext);
  const modalCtx = useContext(ModalContext);

  // 이름, 이미지url State 만들기
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredUrl, setEnteredUrl] = useState("");

  // 한글만 입력받도록
  const titleChangeHandler = (e) => {
    const koreanOnly = e.target.value.replace(
      /[a-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,
      ""
    );
    setEnteredTitle(koreanOnly);
  };
  const urlChangeHandler = (e) => setEnteredUrl(e.target.value);

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

  // Modal 닫을 때 입력값 초기화해주기 위해
  const closeTheModal = () => {
    setEnteredTitle("");
    setEnteredPrice("");
    setEnteredNum("");
    setEnteredUrl("");
    modalCtx.onCloseAddModal;
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
    } else {
      const newMenu = {
        id: 0,
        name: enteredTitle,
        price: enteredPrice,
        image: enteredUrl,
      };

      menuCtx.onAddMenu(newMenu);
      closeTheModal();
      menuCtx.onSelectMenu(newMenu);
    }
  };
  
  //모달 영역 지정해서 바깥 클릭하면 닫히도록
  const addModalRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e) => {
    if (modalCtx.addModalOpened) {
      !addModalRef.current.contains(e.target) ? closeTheModal() : modalCtx.onOpenAddModal();
    }
  };

  return (
    <div className={modalCtx.addModalOpened ? "openModalContainer" : "closedModalContainer"}>
      <div
        id="modal-animation"
        className={modalCtx.addModalOpened ? "openModal" : "closedModal"}
        ref={addModalRef}
        value={modalCtx.addModalOpened}
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
            추가
          </button>
          <button className="button" onClick={closeTheModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
