import "./AddModal.css";
import { useEffect, useState, useRef } from "react";

const EditModal = ({
  isOpened,
  openModal,
  closeModal,
  menus,
  setMenus,
  selectedMenu,
  setSelectedMenu,
}) => {
  // 이름, 이미지url State 만들기
  const [enteredTitle, setEnteredTitle] = useState(selectedMenu.name);
  const [enteredUrl, setEnteredUrl] = useState(selectedMenu.image);

  useEffect(() => setEnteredTitle(selectedMenu.name), [selectedMenu]);
  useEffect(() => setEnteredUrl(selectedMenu.image), [selectedMenu]);

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

  const resetEntered = () => {
    setEnteredTitle(selectedMenu.name);
    setEnteredPrice(selectedMenu.price);
    setEnteredNum(selectedMenu.price.toLocaleString());
    setEnteredUrl(selectedMenu.image);
  };

  const isNameExist = (enteredTitle) => {
    const menusNameArr = menus.map((menu) => menu.name);
    return menusNameArr.includes(enteredTitle);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const regex = /^[ㄱ-ㅎ|가-힣]+$/;
    if (enteredTitle === "") {
      window.alert("메뉴명을 입력해주세요.");
    } else if (!regex.test(enteredTitle)) {
      window.alert("메뉴명은 한글로만 입력해주세요.");
    } else if (
      isNameExist(enteredTitle) &&
      enteredTitle !== selectedMenu.name
    ) {
      window.alert("해당 메뉴명이 이미 존재합니다.");
    } else if (enteredPrice === "") {
      window.alert("가격을 입력해주세요.");
    } else if (enteredNum.slice(-1) !== "0") {
      window.alert("가격은 10원 단위로만 입력해주세요.");
    } else {
      const editedMenu = {
        id: selectedMenu.id,
        name: enteredTitle,
        price: enteredPrice,
        image: enteredUrl,
      };

      const editedMenus = [...menus];
      const menuIdx = editedMenus.findIndex(
        (menu) => menu.id === editedMenu.id
      );
      editedMenus[menuIdx].name = enteredTitle;
      editedMenus[menuIdx].price = enteredPrice;
      editedMenus[menuIdx].image = enteredUrl;

      setMenus(editedMenus);
      resetEntered();
      closeModal();
      setSelectedMenu(editedMenu);
    }
  };

  // Modal 닫을 때 입력값 초기화해주기 위해
  const closeTheModal = () => {
    resetEntered();
    closeModal();
  };

  //모달 영역 지정해서 바깥 클릭하면 닫히도록
  const editModalRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  //모달이 열리지 않았을 때 메뉴를 클릭해도 closeTheModal이 실행되어 수정시 default 입력값(기존 값)이 초기화되는 것 방지
  const handleClickOutside = (e) => {
    if (isOpened) {
      !editModalRef.current.contains(e.target) ? closeTheModal() : openModal();
    }
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
          <button className="button" onClick={closeTheModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
