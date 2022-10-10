# waffle-2022-seminar-react-assignment-1


컴포넌트 구성

App
    Header
    Search
    List
        AddButton>
        DetailView>
        AddModal>
        EditModal
        DeleteModal
        Table
                    Item


버그
0. [setState의 비동기 문제] setState 함수들이 잘 작동하지 않는(EditModal 컴포넌트에서) 것을 확인했다. 찾아보니 setState가 비동기적이라 이전 값을 갖게되는 경우가 있다고 한다.

메뉴 선택 후 다른 메뉴를 선택해서 Edit을 하면 input의 기본값이 이전에 선택했던 메뉴의 정보로 뜬다.
ex) '딸기와플'을 클릭하고 바로 '블루베리스무디' 메뉴를 선택한 뒤, 수정하려고 하면 '딸기와플'의 정보가 뜸. 물론 입력해서 수정하면 잘 바뀜

List.js의 25번째 줄 handleSelectMenu 함수 내에 있는 setSelectedMenu 선언 전과 후에 selectedMenu의 값을 비교확인해보려고 console을 찍어보면 전과 후가 똑같다.

-> 아직 해결되지 않음


개선해야할 & 더 고민해야할 점
0. Select가 문제가 많은데 
1. 3개의 모달 컴포넌트에 복붙 코드가 많아서 하나로 통합할 수 있을 것 같다.
2. 모달 내에서 input을 받는 부분도 코드 길이를 줄여볼 수 있을 것 같다.
3. 모달 바깥을 흐릿하게 구현하는 것 실패 - 구현하려면 모달을 감싸는 전체화면 container를 만들어야하는데, props를 전해 받아야하니까 하위 컴포넌트에 둘 수밖에 없어서 실패했다. 검색해보니 포탈을 쓰면 된다고 하는데 나중에 시도해볼 예정.
4. State를 적절한 컴포넌트에 정의(선언(?))했는지 의문이 든다.
