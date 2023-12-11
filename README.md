# Mechuli

![image](https://github.com/Pudliya/mechuli/assets/144371827/a9767e48-b472-4d29-94cb-c57d86ba9574)

![image](https://github.com/Pudliya/mechuli/assets/144371827/fbf60a5e-453a-4362-b87e-dd163b9a962c)

![image](https://github.com/Pudliya/mechuli/assets/144371827/755e6396-1993-4ecf-926f-ef7e090dccc2)

## Introduction

**메추리 : 메뉴 추천 리스트**

지도를 기반으로 한 메뉴 추천 페이지입니다.  
식사 메뉴가 고민된다면 바로 근처에 있는 맛집을 검색해 보세요.  
한식, 양식, 중식, 일식 카테고리를 통해서도 검색할 수 있고,  
직접 검색어를 입력하여 검색할 수도 있습니다.  
검색된 맛집은 마커로 표시되며 상세정보를 볼 수 있습니다.

## Duration

2023.12.05 ~ 2023.12.11

## Team Member

|  팀원  |         역할          |            깃허브             |              블로그              |
| :----: | :-------------------: | :---------------------------: | :------------------------------: |
| 최광희 |  팀장, 카카오 맵 API  |  https://github.com/Pudliya   |   https://velog.io/@rkdgh4427    |
| 윤창근 |     카카오 맵 API     |  https://github.com/volant97  | https://y-developer.tistory.com/ |
| 임세현 | 메뉴 리스트 사이드 바 | https://github.com/yachaechae |   https://velog.io/@yachaechae   |
| 서지훈 |  상세정보 사이드 바   |  https://github.com/Jihunee   | https://jihune6439.tistory.com/  |

## Development Environment

1. React
2. JavaScript
3. HTML
4. CSS
5. Styled Components (CSS)
6. React Router Dom (Multiple Pages Building)
7. React Query
8. React Icons
9. Axios

## Data Manamgement

- Redux ToolKit
- json Server
- React Query

## Features

- 지도 기반 맛집 검색
  
1.  Geolocation API  
    최초 접속 시 사용자의 위치에 마커를 찍어 현재 위치를 알 수 있게 했습니다.

2.  음식점 코드  
    음식 메뉴를 추천하는 목적에 맞게 음식점 코드인 "FD6"에 포함한 정보만 검색 가능하게 만들었습니다.

3.  두가지 옵션의 버튼  
    전 지역 검색과 현 지역 검색을 가능하게 하는 2개의 버튼을 만들었습니다.  
    2개의 버튼이 눌린 상태를 관리하고 지도 리렌더링 조건이 되는 searchBtnToggle, 전 지역 검색 버튼이 눌린 상태를 관리하는 entireLocationToggle, 현 지역 검색 버튼이 눌린 상태를 관리하는 currentLocationToggle을 만들었습니다.  
    이를 활용하여 버튼이 눌렸음을 인식할 수 있고, 해당하는 검색 옵션에 맞는 로직이 자동으로 돌아갈 수 있도록 만들었습니다.  
    그래서 다른 파트에서 해당 상태값에만 접근하여 토글하는 방법으로 간단하게 로직에 접근이 가능합니다.  
    현재 보고 있는 지도의 정중앙의 위도와 경도를 추출하여 현 지역 검색 버튼에서 검색 범위를 설정할 수 있게 했습니다.

4.  마커 사이 간격에 따른 자동 줌인, 줌아웃  
    사용자의 UX를 향상 시키기 위해서 3가지의 방법을 테스트 했습니다.
    
    첫번째, 보고 있는 줌 단계를 유지하고 마커와 마커 사이 정중앙에 시점을 포커싱.  
    장점은 지도의 줌 단계가 유지되어 사용자가 또 다른 조작없이 원하는 크기의 지도 형태를 볼 수 있었습니다.  
    단점은 마커의 범위가 넓어지면 마커 사이의 간격이 넓어져서 마커는 보이지 않고 산에 화면이 가있는 등 전 지역 검색 시 불편한 점이 있었습니다.
    
    두번째, 검색 마커 중 1번째 마커에 포커싱하는 방법.  
    장점은 무조건 마커가 보이고 1번째에 해당하는 가게의 정보를 바로 확인 할 수 있다는 점이었습니다.  
    단점은 다른 마커를 확인하기 위해서는 줌 아웃하여 위치를 확인하고 다시 접근해야 했습니다.
    
    세번째, 가장 거리가 먼 마커 두개를 기점으로 화면에 모든 마커가 다 들어오게 자동으로 줌인, 줌아웃을 적용시키는 방법  
    모든 마커가 한눈에 들어오고 어느 지역에 마커가 많은지 알 수 있으며 원하는 마커를 바로 접근할 수 있었습니다.  
    그리고 원하는 지역이 있다면 줌인만 하여 접근가능 하며, 제작해 놓은 현 지역 검색도 활용하여 또 다른 정보를 추출할 수 있는 연계성이 좋았습니다.

6.  커스텀 오버레이  
    기존 인포윈도우는 코드를 작성하긴 편리했지만 만질 수 있는 옵션이 없어서 글자가 잘리거나 원하는 형태로 가공하기 어려웠습니다.  
    커스텀 오버레이를 만들고 옵션을 조정하여 적용하였습니다.

- 맛집 리스트  

1. 맛집 리스트 사이드 바 구현  
   검색이 될 때 마커에 해당하는 맛집 리트스를 보여줍니다.

2. 카테고리  
   한식, 양식, 중식, 일식 4가지의 카테고리가 존재하며,  
   카테고리 클릭시 현재 바라보고 있는 위치 기준으로 해당 검색어 검색이 가능합니다.  
   카테고리별 이미지를 부여하여 한 눈에 보기 쉽게 구성하였습니다.

- 상세정보  

1. 상세정보 사이드 바 구현  
   맛집 리스트 혹은 마커를 클릭했을 때 상세정보를 볼 수 있습니다.

2. 리뷰  
   맛집별로 리뷰를 작성할 수 있습니다.  
   Json Server를 통해서 리뷰는 유지가 됩니다.  
   작성 및 삭제 시 비밀번호를 입력하여 작성자만 삭제 가능하게 하였습니다.

## Impression

- 최광희
  새벽까지 어떻게 하면 더 좋은 프로젝트를 만들 수 있을까 고민하던 창근님 잘 안되고 어려워도 포기하지 않으시던 지훈님과 팀원들에게 어떤 어려움이 있는지 지켜봐 주시고 어떻게 하면 더 이쁘게 만들 수 있을까 고민하시던
  세현님께 감사드리며, 시간이 부족해 못했던 부분이 있었지만 훌륭하고 멋진 이 프로젝트를 저와 같이 해주셔서 너무나 감사드립니다.
  카카오 맵 API 리액트 버전을 조금 더 빨리 알고 적용했다면 다른 기능을 더 넣을 수 있었을 텐데 라는 아쉬운 점 입니다. 

- 윤창근  
  처음에는 너무 많은 옵션들 때문에 어떤 코드를 활용해서 원하는 기능을 만들어야하는지 고민이 많았지만,  
  계속해서 적용시켜보며 필요한 기능을 하나씩 찾고 원하는 형태로 만들어서 구현할 수 있었습니다.  
  코드의 작동원리를 이해하게 되면서 전체적인 로직이 보이기 시작하면서 원활한 진행이 가능했습니다.  
  아쉬운 점은 리액트 버전의 코드를 너무 늦게 발견했다는 점입니다.  

  최소한의 리액트 요소를 이용하고 대부분 공식 홈페이지에서 제공하는 자바스크립트 코드만을 활용하여 제작을 하다보니 비효율적인 점이 많았습니다.  
  추후에 리액트 버전으로 리팩터링을 하면서 어떤 차이점이 있는지 분석해보면 좋을 것 같습니다.  

  주말에도 모두 나와서 회의를 하고 프로젝트를 진행한 덕분에 계획했던 기간안에 프로젝트를 완성시킬 수 있었습니다.  
  와이어프레임부터 마지막 디버깅까지 모든 팀원들이 적극적으로 참여했고, 이를 통해서 서로 부족한 부분을 보완하고 더 좋은 아이디어가 있다면 적용시킬 수 있었습니다.  
  그래서 처음에 구상했던 부분보다 더 디벨롭되어 최종 결과물이 나올 수 있었습니다.  
  서로를 존중하고 배려하며 프로젝트를 잘 진행해준 팀원들에게 감사합니다!

- 임세현  
  넣고 싶은 추가적인 설문조사API 기능이나 다른 기능 들이 많이 있었는데 시간상의 이유로 넣지 못한 것이 아쉬움이 남지만, 함께 힘내어 주신 팀원들에게 감사드립니다.
  팀원들 모두 잘 모르는 부분에서 열심히 고민하시고 또 안되는 부분에서 시간 소비 하지 않고 바로바로 물어봐 주셔서 프로젝트 진행에 있어서 깔끔하게 진행이 되는 부분이
  너무 인상 깊었고 항상 열심히 해 주신 팀원분들과 함께해서 이대로도 만족스러운 프로젝트였습니다.

- 서지훈  
  중간에 모르는 부분을 팀원들께서 잘 가르쳐주시고 같이 고민해주셔서 같이 해결해 나갈 수있었습니다.  
  덕분에 무사히 맡은 역할을 구현 할 수 있었습니다.

## Distribution

- Vercel
- Glitch

## Deployment Address

<!--배포주소!!-->
