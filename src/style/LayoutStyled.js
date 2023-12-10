import styled from 'styled-components';

export const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

export const StLayoutDiv = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 10px;
  z-index: 2;
  position: fixed;
  box-shadow: 0px 2px 30px 0px #000;
`;

export const StLogo = styled.div`
  position: absolute;
  left: 30px;
  top: 20px;
  font-size: 32px;
  font-weight: bold;
  color: #fddf62;
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
  height: 35px;
  border-radius: 20px;
  font-size: 1rem;
  text-indent: 1rem;
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
  position: fixed;
  bottom: 5%;
  background-color: white;
  border-radius: 20px;
  color: black;
  font-size: 1rem;
  padding: 0.7rem 1rem;
  border: 2px solid #fddf62;
  box-shadow: 0px 0px 28px rgba(0, 0, 0, 0.25),
    0px 3px 20px 7px rgba(0, 0, 0, 0.22);
  z-index: 2;

  cursor: pointer;
`;
