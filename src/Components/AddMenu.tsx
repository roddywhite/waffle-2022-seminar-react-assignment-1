import "./AddMenu.css";
import "./AddButton";
import { useState, useEffect, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";

import UserContext from "../Contexts/user-context";
import MenuContext from "../Contexts/menu-context";
import { useNavigate, useParams } from "react-router-dom";

import { end, errMsg, successMsg } from "../utils/common";
import HeaderStore from "./HeaderStore";

interface menuType {
  name: string;
  type: string;
  price: number;
  image: string;
  description: string;
}

const AddMenu = () => {
  const userCtx = useContext(UserContext);
  const menuCtx = useContext(MenuContext);
  const navigate = useNavigate();
  const { authAxios } = userCtx;

  // 이름, 종류, 이미지url, 설명 State 만들기
  const [enteredTitle, setEnteredTitle] = useState<string>("");
  const [enteredType, setEnteredType] = useState<string>("");
  const [enteredUrl, setEnteredUrl] = useState<string>("");
  const [enteredDesc, setEnteredDesc] = useState<string>("");

  // 한글만 입력받도록
  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const regex = /[a-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
    if (regex.test(e.target.value)) errMsg("한글만 입력해주세요");
    const koreanOnly = e.target.value.replace(
      /[a-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,
      ""
    );
    setEnteredTitle(koreanOnly);
  };

  // 숫자 세 자리마다 콤마 넣기 (콤마로 바꿔주는 과정에서 price State도 update)
  const [enteredPrice, setEnteredPrice] = useState<number>(0);
  const [enteredNum, setEnteredNum] = useState("");
  const changeEnteredNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const removedCommaValue: number = Number(value.replaceAll(",", ""));
    setEnteredPrice(removedCommaValue);
    setEnteredNum(removedCommaValue.toLocaleString());
  };

  // 취소할 때 입력값 초기화
  const resetEntered = () => {
    setEnteredTitle("");
    setEnteredType("");
    setEnteredPrice(0);
    setEnteredNum("");
    setEnteredUrl("");
    setEnteredDesc("");
  };

  const onAddMenu = (newMenu: menuType) => {
    authAxios
      .post(`${end}/menus`, newMenu)
      .then((res: any) => {
        resetEntered();
        navigate(-1);
        menuCtx.onSelectMenu(res.data);
        successMsg("새 메뉴가 등록되었습니다");
      })
      .catch((res) => {
        errMsg(res.response.data.message);
      });

    // 액세스 토큰 만료시 갱신
    authAxios.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err.response.status === 401) {
          userCtx.onRefresh();
          submitHandler();
        }
      }
    );
  };

  const submitHandler = async () => {
    if (enteredTitle === "") {
      errMsg("메뉴명을 입력해주세요.");
    } else if (enteredPrice === 0) {
      errMsg("가격을 입력해주세요.");
    } else if (enteredNum.slice(-1) !== "0") {
      errMsg("가격은 10원 단위로만 입력해주세요.");
    } else if (enteredType === "") {
      errMsg("종류를 지정해주세요");
    } else {
      const newMenu = {
        name: enteredTitle,
        type: enteredType,
        price: enteredPrice,
        image: enteredUrl,
        description: enteredDesc,
      };
      onAddMenu(newMenu);
    }
  };

  const cancelHandler = () => {
    resetEntered();
    navigate(-1);
  };

  // 로그인 하지 않고 접근했을 때
  useEffect(() => {
    if (!userCtx.isLoggedIn) {
      try {
        userCtx.onRefresh();
      } catch {
        errMsg("로그인 해주세요");
        navigate(-1);
      }
    }
  });

  return (
    <>
      <HeaderStore />
      <div className="addBigContainer">
        <div className="addContainer">
          <h3 className="title">새 메뉴 추가</h3>

          <label className="inputLabel">이름</label>
          <input
            className="inputBox"
            type="text"
            required={true}
            minLength={1}
            maxLength={20}
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
            <option value="waffle">와플</option>
            <option value="beverage">음료</option>
            <option value="coffee">커피</option>
          </select>

          <label className="inputLabel">가격</label>
          <input
            className="inputBox"
            type="text"
            maxLength={7}
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
          <textarea
            className="inputBoxDesc"
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
    </>
  );
};

export default AddMenu;
