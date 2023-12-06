import React from 'react';
import { FiSearch } from 'react-icons/fi';
import mechuliLogo from '../assets/logo/mechuli_logo.png';
import {
  IconBtn,
  LayoutDiv,
  Logo,
  SearchForm,
  SearchInput,
  SearchInputContainer
} from '../style/LayoutStyled';

function Layout() {
  return (
    <>
      <LayoutDiv>
        <Logo>
          <img
            src={mechuliLogo}
            alt="Mechuli 로고"
            style={{ height: '55px' }}
          />
        </Logo>
        <SearchForm>
          <SearchInputContainer>
            <SearchInput placeholder="검색어를 입력해주세요." />
            <IconBtn>
              <FiSearch />
            </IconBtn>
          </SearchInputContainer>
        </SearchForm>
      </LayoutDiv>
    </>
  );
}

export default Layout;
