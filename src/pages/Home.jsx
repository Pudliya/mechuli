import React, { useState } from 'react';
import { StContainer } from '../style/LayoutStyled';
import Header from '../components/Header';
import Kakaomap from '../components/kakaomap/Kakaomap';
import SideBarContainer from '../components/SideBarContainer';
import { QueryClient, QueryClientProvider } from 'react-query';
import DetailBar from '../components/DetailBar';
import ListDetailBar from '../components/ListDetailBar';
import styled from 'styled-components';

// 1. 음식점 카테고리에 속하는 마커 출력
// 2. 한식, 일식, 중식, 양식 카테고리별 마커 출력 (버튼을 만들어서 대신 검색해주는 식)
// 3. 검색(지역 + 카테고리)에 해당하는 마커 출력
// 4. 해당 마커의 목록 사이드바에 출력(데이터 전달)

function Home() {
  const [isOpenDetailBar, setIsOpneDetailBar] = useState(false);
  const [listFindTarget, setIsListFindTarget] = useState('');

  const queryClient = new QueryClient();

  return (
    <>
      <StContainer>
        <Header />
        <Kakaomap
          isOpenDetailBar={isOpenDetailBar}
          setIsOpneDetailBar={setIsOpneDetailBar}
        />
      </StContainer>

      <QueryClientProvider client={queryClient}>
        <SideBarContainer setIsListFindTarget={setIsListFindTarget} />

        <DetailBar
          isOpenDetailBar={isOpenDetailBar}
          setIsOpneDetailBar={setIsOpneDetailBar}
          listFindTarget={listFindTarget}
        />
        <ListDetailBar
          listFindTarget={listFindTarget}
          setIsListFindTarget={setIsListFindTarget}
        />
      </QueryClientProvider>
    </>
  );
}

export default Home;
