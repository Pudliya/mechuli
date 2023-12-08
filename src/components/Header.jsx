import React from 'react';
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

function Header({
  searchInput,
  onInputChange,
  onFormSubmit,
  onSearchInCurrentArea // '현재 지역에서 검색하기' 버튼을 처리하기 위한 새로운 prop
}) {
  const handleSearchInCurrentArea = () => {
    onSearchInCurrentArea();
  };

  return (
    <StLayoutDiv>
      <StLogo>
        <img src={mechuliLogo} alt="Mechuli 로고" />
      </StLogo>
      <StSearchForm onSubmit={onFormSubmit}>
        <StSearchInputContainer>
          <StSearchInput
            value={searchInput}
            onChange={onInputChange}
            placeholder="지역 + 메뉴"
          />
          <StIconBtn type="submit">
            <FiSearch />
          </StIconBtn>
        </StSearchInputContainer>
      </StSearchForm>
      {/* '현재 지역에서 검색하기' 버튼 추가 */}
      <StSearchCurrentAreaBtn onClick={handleSearchInCurrentArea}>
        현재 지역에서 검색하기
      </StSearchCurrentAreaBtn>
    </StLayoutDiv>
  );
}

export default Header;
