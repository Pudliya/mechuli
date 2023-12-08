import React from 'react';
import { FiSearch } from 'react-icons/fi';
import mechuliLogo from '../assets/logo/mechuli_logo.png';
import {
  StIconBtn,
  StLayoutDiv,
  StLogo,
  StSearchForm,
  StSearchInput,
  StSearchInputContainer
} from '../style/LayoutStyled';

const Header = ({ searchInput, onInputChange, onFormSubmit }) => {
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
    </StLayoutDiv>
  );
};

export default Header;
