import styled, { css } from 'styled-components';
export const StToggleContainer = styled.div`
  height: 95vh;
  position: fixed;
  top: 5vh;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  overflow: hidden;
`;

export const StToggle = styled.button`
  height: 10%;
  background: #fddf62;
  border: 0;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  cursor: pointer;
`;

export const StSideBar = styled.section`
  width: 400px;
  height: 100%;
  background: #d9d9d9;
  padding: 1rem 1.5rem;
  position: sticky;
  top: 0;
  left: 0;
  border-radius: 0 2rem 2rem 0;
  overflow-y: visible;
  overflow-x: hidden;

  & h2 {
    text-align: center;
    margin: 2rem 0;
    font-size: 1.7rem;
  }

  /* 스크롤바의 폭 너비 */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #fddf62; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }

  &::-webkit-scrollbar-track {
    background: rgba(253, 223, 98, 0.1); /*스크롤바 뒷 배경 색상*/
  }
  &::-webkit-scrollbar-button:vertical:start:decrement,
  &::-webkit-scrollbar-button:vertical:start:increment,
  &::-webkit-scrollbar-button:vertical:end:decrement {
    display: block;
    height: 15px;
  }
`;

export const StTabMenu = styled.div`
  display: flex;
  justify-content: space-between;
  & button {
    font-size: 1.2rem;
    padding: 0.5rem 1.2rem;
    border: 0;
    border-radius: 20px;
    line-height: 1.2;
    background: #fff;
    cursor: pointer;
  }
`;
export const StList = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const StListItem = styled.div`
  display: flex;
  gap: 1rem;
  background: #fff;
  padding: 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    scale: 1.08;
  }
  & svg {
    max-width: 100px;
    width: 100%;
    border-radius: 50%;
  }
`;

export const StItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;

  & p {
    font-size: 1.2rem;
    word-break: keep-all;
  }
`;
