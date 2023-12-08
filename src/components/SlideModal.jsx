import React, { useState } from 'react';
import { StSlideModalContainer } from '../style/StAddSlider';

export default function SlideModal({ imgurl }) {
  const [imageIndex, setImageIndex] = useState(0);
  const showNextImage = () => {
    setImageIndex((idx) => {
      if (idx === imgurl.length - 1) return 0;
      return idx + 1;
    });
  };
  const showPrevImage = () => {
    setImageIndex((idx) => {
      if (idx === 0) return imgurl.length - 1;
      return idx - 1;
    });
  };

  return (
    <StSlideModalContainer>
      <div>
        <div className="slide-wrapper">
          {imgurl.map((url) => (
            <img
              key={url}
              src={url}
              alt=""
              style={{ translate: `${-100 * imageIndex}%` }}
            />
          ))}

          <div className="button-group">
            <button
              className="right-button"
              style={{
                right: '0',
                display: `${
                  imageIndex === imgurl.length - 1 ? 'none' : 'block'
                }`
              }}
              onClick={showNextImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </button>
            <button
              className="left-button"
              style={{
                left: '0',
                display: `${imageIndex === 0 ? 'none' : 'block'}`
              }}
              onClick={showPrevImage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </StSlideModalContainer>
  );
}
