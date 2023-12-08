import React from 'react';
import { StSideBar } from '../style/StSideBar';
import SideBarCategory from './SideBarCategory';
import SideBarLIst from './SideBarLIst';

export default function SideBarContents() {
  return (
    <>
      <StSideBar>
        <SideBarCategory />
        <h2>맛집 리스트</h2>
        <SideBarLIst />
      </StSideBar>
    </>
  );
}
