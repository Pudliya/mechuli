import styled from 'styled-components';

export const StLayoutDiv = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: black;
  padding: 10px;
`;

export const StLogo = styled.div`
  font-size: 32px;
  font-weight: bold;
  img {
    width: 48px;
  }
  cursor: pointer;
`;

export const StSearchForm = styled.form`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const StSearchInputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const StSearchInput = styled.input`
  width: 300px;
  height: 27px;
  border-radius: 20px;
  padding-right: 40px;
  position: relative;
`;

export const StIconBtn = styled.button`
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
`;
