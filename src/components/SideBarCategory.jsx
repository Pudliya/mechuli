import React from 'react';
import { StTabMenu } from '../style/StSideBar';
import { useDispatch } from 'react-redux';
import {
  searchBtnToggle,
  setCurrentLocationToggle,
  setSearchBtnToggle,
  setSearchPlace
} from '../redux/slices/searchSlice';

export default function SideBarCategory() {
  const dispatch = useDispatch();
  const categoryArrays = ['한식', '양식', '중식', '일식'];

  const currentSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchPlace(value));
    dispatch(setSearchBtnToggle(!searchBtnToggle));
    dispatch(setCurrentLocationToggle(true));
  };
  return (
    <>
      <StTabMenu>
        {categoryArrays.map((item) => {
          return (
            <button onClick={currentSearch} value={item}>
              {item}
            </button>
          );
        })}
      </StTabMenu>
    </>
  );
}
