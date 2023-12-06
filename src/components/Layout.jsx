import React from 'react';
import { FiSearch } from 'react-icons/fi';
import mechuliLogo from '../assets/logo/mechuli_logo.png';
import Home from '../pages/Home';
import {
  StIconBtn,
  StLayoutDiv,
  StLogo,
  StSearchForm,
  StSearchInput,
  StSearchInputContainer
} from '../style/LayoutStyled';

function Layout() {
  const onChangeSearchHandler = () => {};

  const onClickSearchHandler = () => {};

  return (
    <>
      <StLayoutDiv>
        <StLogo>
          <img src={mechuliLogo} alt="Mechuli 로고" />
        </StLogo>
        <StSearchForm>
          <StSearchInputContainer>
            <StSearchInput
              placeholder="검색어를 입력해주세요."
              onChange={onChangeSearchHandler}
              // 엔터키를 눌러도 검색 가능
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onClickSearchHandler();
                }
              }}
            />
            <StIconBtn onClick={onClickSearchHandler}>
              <FiSearch />
            </StIconBtn>
          </StSearchInputContainer>
        </StSearchForm>
      </StLayoutDiv>
      <Home />
    </>
  );
}

export default Layout;
