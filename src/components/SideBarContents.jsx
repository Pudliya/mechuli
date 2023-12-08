import React from 'react';
import { StSideBar } from '../style/StSideBar';
import SideBarCategory from './SideBarCategory';
import SideBarLIst from './SideBarLIst';
import ChineseFood from '../assets/logo/icon/ChineseFood';
import KoreanFood from '../assets/logo/icon/KoreanFood';
import DefaultIcon from '../assets/logo/icon/DefaultIcon';
import JapaneseFood from '../assets/logo/icon/JapaneseFood';
import WesternFood from '../assets/logo/icon/WesternFood';

export default function SideBarContents() {
  return (
    <>
      <StSideBar>
        <SideBarCategory />
        <h2>맛집 리스트</h2>
        <SideBarLIst />

        <ChineseFood />
        <KoreanFood />
        <DefaultIcon />
        <WesternFood />
        <JapaneseFood />
      </StSideBar>
    </>
  );
}
