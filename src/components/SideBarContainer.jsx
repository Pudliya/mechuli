import React, { useState } from 'react';
import { StToggle, StToggleContainer } from '../style/StSideBar';
import SideBarContents from './SideBarContents';

export default function SideBarContainer() {
  const [isOpen, setIsOpen] = useState(false);

  const [buttonText, setButtonText] = useState('>');

  const onToggle = () => {
    setIsOpen(!isOpen);

    setButtonText(isOpen ? '>' : '<');
  };

  return (
    <>
      <StToggleContainer>
        {isOpen && <SideBarContents />}
        <StToggle onClick={onToggle}>{buttonText}</StToggle>
      </StToggleContainer>
    </>
  );
}
