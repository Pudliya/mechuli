import React, { useRef } from 'react';
import mechuli_page1 from '../assets/mechuli_page/mechuli_page1.gif';
import styled, { keyframes } from 'styled-components';

function Mechuli() {
  const StContainerRef = useRef(null);

  const hendelOnClickShowMapBtn = () => {
    StContainerRef.current.classList.add('display-none');
    // StContainerRef.current.classList.add('hide');
    // setTimeout(() => {
    //   StContainerRef.current.classList.add('display-none');
    // }, 500);
  };

  return (
    <StContainer ref={StContainerRef}>
      <StShowMapBtn onClick={hendelOnClickShowMapBtn}>
        지도로 보는 메추리
      </StShowMapBtn>
      <StMechuliImg1 src={mechuli_page1} alt="mechuli_page1" />
    </StContainer>
  );
}

export default Mechuli;

const StContainer = styled.div`
  position: relative;
  transition: right 1s ease-out, opacity 0.5s ease-out;
  right: 0;

  &.hide {
    opacity: 0;
    right: 100%;
  }

  &.display-none {
    display: none;
  }
`;

const StMechuliImg1 = styled.img`
  width: 100vw;
  height: 100vh;
`;

const StShowMapBtn = styled.button`
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translateX(-50%) translateY(-50%);
  background: transparent;
  padding: 10px;
  background-color: #ffff;
  border: 3px solid #fffb00;
  border-radius: 30px;
  box-shadow: 0px 3px 5px #686868;
  cursor: pointer;
`;
