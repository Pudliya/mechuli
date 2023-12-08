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
  const [Place, setPlace] = useState(''); // 검색한값
  const [searchBtnToggle, setSearchBtnToggle] = useState(false);

  const serchFormOnSubmitHandler = (e) => {
    e.preventDefault();
    setPlace(searchInput);
    setSearchBtnToggle(!searchBtnToggle);
    // setSearchInput('');
  };

  const serchInputOnChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <StContainer>
        <Header
          searchInput={searchInput}
          onInputChange={serchInputOnChangeHandler}
          onFormSubmit={serchFormOnSubmitHandler}
        />
        <Kakaomap searchPlace={Place} searchBtnToggle={searchBtnToggle} />
      </StContainer>
    </>
  );
}

export default Layout;
