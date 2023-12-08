import React, { useState } from 'react';
import { StContainer } from '../style/LayoutStyled';
import Header from './Header';
import Kakaomap from './Kakaomap';
import SideBarContainer from './SideBarContainer';
import { QueryClient, QueryClientProvider } from 'react-query';
import DetailBar from './DetailBar';

// 1. 음식점 카테고리에 속하는 마커 출력
// 2. 한식, 일식, 중식, 양식 카테고리별 마커 출력 (버튼을 만들어서 대신 검색해주는 식)
// 3. 검색(지역 + 카테고리)에 해당하는 마커 출력
// 4. 해당 마커의 목록 사이드바에 출력(데이터 전달)

function Layout() {
  const [searchPlace, setSearchPlace] = useState('');
  const [searchBtnToggle, setSearchBtnToggle] = useState(false);
  const [entireLocationToggle, setEntireLocationToggle] = useState(false);
  const [currentLocationToggle, setCurrentLocationToggle] = useState(false);
  const [isOpenDetailBar, setIsOpneDetailBar] = useState(false);

  const queryClient = new QueryClient();

  // console.log('searchBtnToggle : ', searchBtnToggle);
  // console.log('entireLocationToggle : ', entireLocationToggle);
  // console.log('currentLocationToggle1 : ', currentLocationToggle);

  return (
    <>
      <StContainer>
        <Header
          setSearchPlace={setSearchPlace}
          searchBtnToggle={searchBtnToggle}
          setSearchBtnToggle={setSearchBtnToggle}
          setEntireLocationToggle={setEntireLocationToggle}
          setCurrentLocationToggle={setCurrentLocationToggle}
        />
        <Kakaomap
          searchPlace={searchPlace}
          searchBtnToggle={searchBtnToggle}
          entireLocationToggle={entireLocationToggle}
          setEntireLocationToggle={setEntireLocationToggle}
          currentLocationToggle={currentLocationToggle}
          setCurrentLocationToggle={setCurrentLocationToggle}
          isOpenDetailBar={isOpenDetailBar}
          setIsOpneDetailBar={setIsOpneDetailBar}
        />
      </StContainer>

      <SideBarContainer />

      <QueryClientProvider client={queryClient}>
        <DetailBar
          isOpenDetailBar={isOpenDetailBar}
          setIsOpneDetailBar={setIsOpneDetailBar}
        />
      </QueryClientProvider>
    </>
  );
}

export default Layout;
