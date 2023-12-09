import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import mechuliLogo from '../assets/logo/mechuli_logo.png';
import {
  StIconBtn,
  StLayoutDiv,
  StLogo,
  StSearchCurrentAreaBtn,
  StSearchForm,
  StSearchInput,
  StSearchInputContainer
} from '../style/LayoutStyled';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentLocationToggle,
  setEntireLocationToggle,
  setSearchBtnToggle,
  setSearchPlace
} from '../redux/slices/searchSlice';

function Header({}) {
  const [searchInput, setSearchInput] = useState('');
  const searchBtnToggle = useSelector((state) => state.search.searchBtnToggle);

  const dispatch = useDispatch();

  const searchInputOnChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const searchFormOnSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchPlace(searchInput));
    dispatch(setSearchBtnToggle(!searchBtnToggle));
    dispatch(setEntireLocationToggle(true));
  };

  const searchInCurrentArea = () => {
    dispatch(setSearchPlace(searchInput));
    dispatch(setSearchBtnToggle(!searchBtnToggle));
    dispatch(setCurrentLocationToggle(true));
  };

  return (
    <>
      <StLayoutDiv>
        <StLogo>
          <img src={mechuliLogo} alt="Mechuli 로고" />
        </StLogo>
        <StSearchForm onSubmit={searchFormOnSubmitHandler}>
          <StSearchInputContainer>
            <StSearchInput
              value={searchInput}
              onChange={searchInputOnChangeHandler}
              placeholder="지역 + 메뉴 (최대 15개 검색 가능!)"
            />
            <StIconBtn type="submit">
              <FiSearch />
            </StIconBtn>
          </StSearchInputContainer>
        </StSearchForm>
      </StLayoutDiv>
      {/* '현재 지역에서 검색하기' 버튼 추가 */}
      <StSearchCurrentAreaBtn type="button" onClick={searchInCurrentArea}>
        현재 지역에서 검색하기
      </StSearchCurrentAreaBtn>
    </>
  );
}

export default Header;
