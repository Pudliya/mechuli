import styled from 'styled-components';

export const StDeleteImage = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 55px;
  cursor: pointer;
  border: 3px solid #fdd5a5;
  border-radius: 50%;
  & img {
    scale: 0.5;
  }
`;

// List에서 보여주는 슬라이드 Modal

export const StSlideModalContainer = styled.div`
  width: 133px;
  text-align: center;
  &:hover {
    .button-group button {
      opacity: 1;
      visibility: 1;
    }
  }
  position: relative;
  > div {
    width: 100%;
    height: 100%;
  }
  .slide-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
  }

  img {
    width: 150px;
    aspect-ratio: 4/3;
    transition: translate 300ms ease-in-out;
  }

  .button-group button {
    display: block;
    position: absolute;
    opacity: 0;
    visibility: 0;
    top: 50%;
    transform: translate(0, -50%);
    padding: 4px;
    cursor: pointer;
    border-radius: 100%;
    transition: background-color 100ms ease-in-out;
    &:hover,
    &:focus-visible {
      background-color: rgba(0, 0, 0, 0.1);
    }
    svg {
      stroke: white;
      fill: #000;
      width: 12px;
      height: 8px;
    }
  }
`;
