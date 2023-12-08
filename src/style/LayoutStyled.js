import styled from 'styled-components';

export const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

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
  height: 30px;
  border-radius: 20px;
  padding: 0 40px 0 15px;
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

export const StSearchCurrentAreaBtn = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 10px;
  padding: 10px 20px;
  cursor: pointer;
`;
