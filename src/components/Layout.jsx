import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import mechuliLogo from '../assets/logo/mechuli_logo.png';
import Kakaomap from './Kakaomap';
import {
  StContainer,
  StIconBtn,
  StLayoutDiv,
  StLogo,
  StSearchForm,
  StSearchInput,
  StSearchInputContainer
} from '../style/LayoutStyled';

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
      {/*  ----------------이부분은 Header components로 다시 설정.S------------------ */}
      <StContainer>
        <StLayoutDiv>
          <StLogo>
            <img src={mechuliLogo} alt="Mechuli 로고" />
          </StLogo>
          <StSearchForm onSubmit={serchFormOnSubmitHandler}>
            <StSearchInputContainer>
              <StSearchInput
                value={searchInput}
                onChange={serchInputOnChangeHandler}
                placeholder="지역 + 메뉴"
              />
              <StIconBtn type="submit">
                <FiSearch />
              </StIconBtn>
            </StSearchInputContainer>
          </StSearchForm>
        </StLayoutDiv>
        {/*  ----------------이부분은 Header components로 다시 설정.E ------------------ */}
        <Kakaomap searchPlace={Place} searchBtnToggle={searchBtnToggle} />
      </StContainer>
    </>
  );
}

export default Layout;
