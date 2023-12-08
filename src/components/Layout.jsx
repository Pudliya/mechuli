import React, { useState } from 'react';
import { StContainer } from '../style/LayoutStyled';
import Header from './Header';
import Kakaomap from './Kakaomap';

// 1. 음식점 카테고리에 속하는 마커 출력
// 2. 한식, 일식, 중식, 양식 카테고리별 마커 출력 (버튼을 만들어서 대신 검색해주는 식)
// 3. 검색(지역 + 카테고리)에 해당하는 마커 출력
// 4. 해당 마커의 목록 사이드바에 출력(데이터 전달)

function Layout() {
  const [searchInput, setSearchInput] = useState('');
  const [searchPlace, setSearchPlace] = useState('');
  const [searchBtnToggle, setSearchBtnToggle] = useState(false);

  const searchFormOnSubmitHandler = (e) => {
    e.preventDefault();
    setSearchPlace(searchInput);
    setSearchBtnToggle(!searchBtnToggle);
  };

  const searchInputOnChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const searchInCurrentArea = () => {
    setSearchBtnToggle(!searchBtnToggle);
  };

  return (
    <>
      <StContainer>
        <Header
          searchInput={searchInput}
          onInputChange={searchInputOnChangeHandler}
          onFormSubmit={searchFormOnSubmitHandler}
          onSearchInCurrentArea={searchInCurrentArea}
        />
        <Kakaomap searchPlace={searchPlace} searchBtnToggle={searchBtnToggle} />
      </StContainer>
    </>
  );
}

export default Layout;
