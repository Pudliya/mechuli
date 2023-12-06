import styled from 'styled-components';

export const LayoutDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: black;
  padding: 10px;
  font-size: 24px; /* 로고 크기 조정 */
`;

export const Logo = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 20px;
  padding-right: 40px;
  position: relative;
`;

export const IconBtn = styled.button`
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
`;
