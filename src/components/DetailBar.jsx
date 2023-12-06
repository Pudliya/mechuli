import AddReview from './AddReview';
import foodjpg from '../assets/foodtest.jpg';
import {
  StContainer,
  StAvatarFigure,
  StTitle,
  StAddress,
  StContent,
  StToggleButton
} from '../style/StDetailBar';
import DetailModal from './DetailModal';
import { useState } from 'react';

export default function DetailBar() {
  const [isModal, setIsModal] = useState(false);

  function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.transform =
      sidebar.style.transform === 'translateX(0px)'
        ? 'translateX(-400px)'
        : 'translateX(0px)';
    var togglebar = document.getElementById('togglebar');
    togglebar.style.transform =
      togglebar.style.transform === 'translateX(0px)'
        ? 'translateX(-400px)'
        : 'translateX(0px)';
  }
  return (
    <>
      <StToggleButton id="togglebar" onClick={toggleSidebar}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABP0lEQVR4nO2ZwU7DMAxA3YSuRRzoDul2aJMJVVrL1V+0fxwScNh+inLgEhS2okEjdoLZxU+Kcn6yk9gxgCAIwm+DiKm7u9+EHbiCiGnt2sfKrt8qt35iKYNHiXLh+kQpbxa2r227a5omA5YSSeIBwIedlQweJczSvQwSwzrIuNfatg/ASaKYl15pzUsEv6VTkJjN8pjEjmxqiQQVJBJUkEhQjUSe30SuWOKvN0bKjvGrLRKXOdjjsoNZJIpo2cFMAgC81le8JAKhQh2q2NvCfEmnsExp+8p1z+S7vtp120HkNBLsRPAztVZnrttuTzq1YjJKaZ+m2TRkinBzZdcic3EkMlTB/3lmWtqvfkBkqCKRocokI2NOPrHHPYyj/Yk9qbHCTy0Ai9/4szIfozeGErFhaNjJd5OTH08LggB/yjs9cakIk7pOHwAAAABJRU5ErkJggg==" />{' '}
      </StToggleButton>
      <StContainer id="sidebar">
        <StAvatarFigure>
          <img src={foodjpg} alt="맛집 사진" />
        </StAvatarFigure>
        <StTitle>스미카츠</StTitle>
        <StAddress>서울 강남구 선릉로157길 23-3 지상 1층 101호</StAddress>
        <StContent>
          카츠에 대해서 만큼은 단언컨데 최고라 자부하는 숯불 훈연 카츠,카츠동
          전문점 제주산 암퇘지 선별육 등심,안심,1++등급과 꽃목살 정중앙만
          사용하는 스미 카츠입니다
        </StContent>
        <AddReview setIsModal={setIsModal} />
        <DetailModal isModal={isModal} setIsModal={setIsModal} />
      </StContainer>
    </>
  );
}
