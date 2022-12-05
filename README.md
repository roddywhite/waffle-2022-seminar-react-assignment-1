# waffle-2022-seminar-react-assignment-4

S3 - http://waffle-studio-assignment-1.s3-website.ap-northeast-2.amazonaws.com/
CloudFront - https://d3u2m390lw3raa.cloudfront.net/

* Auth 관련 (`user-context.tsx`)
    - `user-context`에서 토큰, 로그인 관리. 사실상 auth context.
    - axios config : 인증이 필요한 요청을 해야하는 컴포넌트에서는 userContext로부터 authAxios를 받아 사용할 수 있도록 함

* 홈 화면 (`Home.tsx`, `StoreShortcut.tsx`)
    - owners 목록에서 store_name이 있는 사람들만 뽑아 store 리스트를 만들어 화면에 보여줌
    - 아직은 문제가 없지만, 혹시나 가게 이름 또는 설명이 너무 많이 길 때는 디자인이 망가질 수도 있을 것 같음
    - 백엔드와 소통해서 최대 글자수를 조정하거나, 일정 글자수가 넘어가면 폰트 사이즈가 작아지도록 해야할듯

* 내 정보 탭 (`Profile.tsx`)
    - profile페이지에서 스토어 이름과 설명을 수정할 수 있도록 구현

* 스토어 진입시 메뉴 리스트 / 검색
    - API 호출하여 검색가능, 0.5초 throttling 적용
    - 검색어는 search-context에서 관리하며, 입력이 되지 않은 상황에서는 스토어의 전체 메뉴를 가져오도록 구현
    - 스토어 진입시 로딩시간이 아주 약간 소요됨 -> 성능 최적화를 할 수 있는 여지가 있는 것일지 고민 필요. 아니라면 로딩 이미지나 애니메이션을 넣는 방법이 있을듯
    - 검색창에는 검색어 초기화 하는 X 버튼을 추가해 UX 개선

* 리뷰 (`DetailVeiw.tsx`, `Review.tsx`)
    - intersection observer API를 활용해 한번에 6개씩만 리뷰를 받아오도록 무한스크롤 구현
    - 리뷰를 이어서 불러와야 할 때마다, API호출시 필요한 next 값을 변경해줘야 하는데, state로 관리를 하려고 하였으나 값 변경이 바로 되지 않아 오류를 발생시키기 때문에 useRef를 이용해 값 관리. (useRef는 리렌더링을 발생시키지 않지만, 어차피 reviews state가 바뀔때 리렌더링되므로 괜찮음)

* 별점 입력 (`Review.tsx`, `AddReview.tsx`) 
    - 리뷰 추가나 수정시 마우스를 갖다 대면 마우스 위치까지 색칠된 별이 보여지고, 클릭하면 값이 일시적으로 저장된다.
    - 반 개 짜리 별 입력을 해야하는지 몰랐을 때는 hover 등 css 스타일링으로 구현이 쉬웠지만, 반 개를 어떻게 처리할지 고민이 많이 되었음.
    - 해결방법 : 현재 마우스의 x좌표 (e.clientX)에서 별의 x좌표(e.target.getBoundingClientRect().left)를 뺀 값을 구해 마우스가 별에서 얼마나 떨어졌는지를 파악해 이에 따라 enteredRating state를 변경했고, 또 그에 맞게 별의 src가 셋(빈별, 반별, 꽉찬별) 중 하나로 정해지도록 구현함

* 리뷰 추가, 수정, 삭제
    - 리뷰가 추가, 수정, 삭제될 때 첫 6개 메뉴를 불러오는 함수를 호출하여 리뷰 리스트가 최신으로 업데이트 되도록 하였다.
    - 하지만 그러다 보니 꽤나 아래에 위치한 리뷰를 `수정`했을 경우 새 리뷰 목록이 화면에 표시되느라 화면 포커스가 위로 이동해 사용자 경험을 해칠 수 있다.
    - UX개선을 위한 방법을 고민해야할 것 같다. 생각나는 방법으로는 '리뷰 전체를 불러오는 것이 아니라 해당 리뷰 하나만 불러와서 바뀐 부분만 렌더링하기' 가 있다. 시간관계상 다음에 시도해볼 예정.

* 사용한 라이브러리
	* `react-moment:` : 리뷰 작성 시간을 ago로 나타내줌. weekly download 17만 이상이고, 한국어 지원이 되어서 사용
	* `toastify` : alert 대체 알림. 에러 혹은 액션 성공에 대한 정보를 오른쪽 상단에 타이머 걸린 메세지로 표시. weekly download 100만에 달하는 라이브러리이며, 실제로 웹서핑 중에도 많은 웹사이트들이 사용하고 있는 것을 확인했을 정도로 대중적인 라이브러리라 사용함.
