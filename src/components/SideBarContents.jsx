import React from 'react';
import { StSideBar } from '../style/StSideBar';
import SideBarCategory from './SideBarCategory';
import SideBarLIst from './SideBarLIst';
import ChineseFood from '../assets/logo/icon/ChineseFood';
import KoreanFood from '../assets/logo/icon/KoreanFood';
import DefaultIcon from '../assets/logo/icon/DefaultIcon';
import JapaneseFood from '../assets/logo/icon/JapaneseFood';
import WesternFood from '../assets/logo/icon/WesternFood';
import { QueryClient, QueryClientProvider } from 'react-query';
import DetailBar from './DetailBar';

export default function SideBarContents() {
  const queryClient = new QueryClient();
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
      <QueryClientProvider client={queryClient}>
        <DetailBar />
      </QueryClientProvider>
    </>
  );
}
