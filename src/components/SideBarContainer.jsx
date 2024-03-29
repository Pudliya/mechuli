import React, { useEffect, useState } from 'react';
import { StToggle, StToggleContainer } from '../style/StSideBar';
import SideBarContents from './SideBarContents';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen } from '../redux/slices/sideBarSlice';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

export default function SideBarContainer({ setIsListFindTarget }) {
  // const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState(<SlArrowRight size={25} />);

  const isOpen = useSelector((state) => state.sideBar.isOpen);
  const dispatch = useDispatch();

  const onToggle = () => {
    dispatch(setIsOpen(!isOpen));
  };
  useEffect(() => {
    setButtonText(
      isOpen ? <SlArrowLeft size={25} /> : <SlArrowRight size={25} />
    );
  }, [isOpen]);

  return (
    <>
      <StToggleContainer>
        {isOpen && (
          <SideBarContents setIsListFindTarget={setIsListFindTarget} />
        )}
        <StToggle onClick={onToggle}>{buttonText}</StToggle>
      </StToggleContainer>
    </>
  );
}
