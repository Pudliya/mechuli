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
  overflow-y: scroll;
  overflow-x: hidden;

  & h2 {
    text-align: center;
    margin: 2rem 0;
    font-size: 1.7rem;
  }
`;

export const StTabMenu = styled.div`
  display: flex;
  justify-content: space-between;
  & button {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
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
