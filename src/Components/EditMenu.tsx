import "./EditMenu.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { end, errMsg, successMsg } from "../utils/common";

import UserContext from "../Contexts/user-context";
import MenuContext from "../Contexts/menu-context";

import NotFound from "./NotFound";
import axios from "axios";
import HeaderStore from "./HeaderStore";

const EditMenu = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const menuCtx = useContext(MenuContext);
  const user = userCtx.user as any;
  const { authAxios } = userCtx;
  const { storeId, menuId } = useParams();
  const [menu, setMenu] = useState<any>(null);

  // 메뉴 최신정보 불러오기
  useEffect(() => {
    axios.get(`${end}/menus/${menuId}`).then((res) => {
      setMenu(res.data);
    });
  }, []);

  // 이미지url, 설명 State 만들기
  const [enteredUrl, setEnteredUrl] = useState(menu?.image);
  const [enteredDesc, setEnteredDesc] = useState(menu?.description);

  useEffect(() => setEnteredUrl(menu?.image), [menu]);
  useEffect(() => setEnteredDesc(menu?.description), [menu]);

  // 숫자 세 자리마다 콤마 넣기 (콤마로 바꿔주는 과정에서 price State도 update)
  const [enteredPrice, setEnteredPrice] = useState<number>(menu?.price);
  const [enteredNum, setEnteredNum] = useState<string>(menu?.price.toLocaleString());

  const changeEnteredNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const removedCommaValue: number = Number(value.replaceAll(",", ""));
    setEnteredPrice(removedCommaValue);
    setEnteredNum(removedCommaValue.toLocaleString());
  };

  useEffect(() => setEnteredNum(menu?.price.toLocaleString()), [menu]);

  // 수정 취소할 때 입력값 초기화
  const resetEntered = () => {
    setEnteredPrice(menu?.price);
    setEnteredNum(menu?.price.toLocaleString());
    setEnteredUrl(menu?.image);
    setEnteredDesc(menu?.description);
  };

  const submitHandler = () => {
    if (enteredPrice === 0) {
      errMsg("가격을 입력해주세요.");
    } else if (enteredNum.slice(-1) !== "0") {
      errMsg("가격은 10원 단위로만 입력해주세요.");
    } else {
      const editedMenu = {
        price: enteredPrice,
        image: enteredUrl,
        description: enteredDesc,
      };

      authAxios
        .patch(`${end}/menus/${menuId}`, editedMenu)
        .then((res) => {
          resetEntered();
          navigate(-1);
          successMsg("메뉴가 수정되었습니다");
        })
        .catch((res) => {
          errMsg(res.response.data.message);
        });
    }
  };

  const cancelHandler = () => {
    resetEntered();
    navigate(-1);
  };

  // 로그인 하지 않고 접근했을 때
  useEffect(() => {
    if (!userCtx.isLoggedIn) {
      errMsg("로그인 해주세요");
      setTimeout(() => navigate(-1), 3000);
    } else if (user?.id !== Number(storeId)) {
      errMsg("접근 권한이 없습니다");
      setTimeout(() => navigate(-1), 3000);
    }
  }, []);

  // 내 소유가 아닌 스토어의 메뉴에 접근했을 때
  // storeId !== userId

  return (
    <>
      {!menu && <NotFound />}
      {menu && (
        <>
          <HeaderStore />
          <div
            className={user?.id === Number(storeId) ? "editBigContainer" : "hidden"}
          >
            <div className="editContainer">
              <h3 className="title">메뉴 수정</h3>
              <div className="fixedCon">
                <label className="label">이름</label>
                <a className="fixed">{menu.name}</a>
              </div>
              <div className="fixedCon">
                <label className="label">종류</label>
                <a className="fixed">
                  {menu.type === "waffle"
                    ? "와플"
                    : menu.type === "beverage"
                    ? "음료"
                    : menu.type === "coffee"
                    ? "커피"
                    : ""}
                </a>
              </div>

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
                placeholder="이미지 주소를 입력해주세요"
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
                  저장
                </button>
                <button className="button" onClick={cancelHandler}>
                  취소
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditMenu;
