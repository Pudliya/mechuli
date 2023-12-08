import React from 'react';
import { StTabMenu } from '../style/StSideBar';

export default function SideBarCategory() {
  const categoryArrays = ['한식', '양식', '중식', '일식'];
  return (
    <>
      <StTabMenu>
        {categoryArrays.map((item) => {
          return <button>{item}</button>;
        })}
      </StTabMenu>
    </>
  );
}
