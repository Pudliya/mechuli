import React, { useEffect, useRef } from 'react';
import mechuli_page1 from '../assets/mechuli_page/mechuli_page1.gif';
import styled from 'styled-components';

function Mechuli() {
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // 페이지가 로드된 후 5초 뒤에 이미지에 hide 클래스 추가
    const timeoutId = setTimeout(() => {
      const imageElement = imageRef.current;
      if (imageElement) {
        imageElement.classList.add('hide');
      }
    }, 4000);
    // 컴포넌트 언마운트 시 타이머 해제
    return () => clearTimeout(timeoutId);
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  return (
    <StContainer>
      <div className="image-container">
        <img
          ref={imageRef}
          src={mechuli_page1}
          alt="mechuli_page1"
          className="image"
        />
      </div>
    </StContainer>
  );
}

export default Mechuli;

const StContainer = styled.div`
  /* 초기 상태: 이미지는 보이도록 설정 */
  .image {
    opacity: 1;
  }

  /* 5초 후에 사라지도록 설정 */
  .image.hide {
    opacity: 0;
  }
`;
