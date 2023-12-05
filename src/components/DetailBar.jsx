import React from 'react';
import AddReview from './AddReview';
import foodjpg from '../assets/foodtest.jpg';
import {
  Container,
  AvatarFigure,
  Title,
  Address,
  Content
} from '../style/StDetailBar';
import styled from 'styled-components';

export default function DetailBar() {
  return (
    <>
      <ToggleButton>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABP0lEQVR4nO2ZwU7DMAxA3YSuRRzoDul2aJMJVVrL1V+0fxwScNh+inLgEhS2okEjdoLZxU+Kcn6yk9gxgCAIwm+DiKm7u9+EHbiCiGnt2sfKrt8qt35iKYNHiXLh+kQpbxa2r227a5omA5YSSeIBwIedlQweJczSvQwSwzrIuNfatg/ASaKYl15pzUsEv6VTkJjN8pjEjmxqiQQVJBJUkEhQjUSe30SuWOKvN0bKjvGrLRKXOdjjsoNZJIpo2cFMAgC81le8JAKhQh2q2NvCfEmnsExp+8p1z+S7vtp120HkNBLsRPAztVZnrttuTzq1YjJKaZ+m2TRkinBzZdcic3EkMlTB/3lmWtqvfkBkqCKRocokI2NOPrHHPYyj/Yk9qbHCTy0Ai9/4szIfozeGErFhaNjJd5OTH08LggB/yjs9cakIk7pOHwAAAABJRU5ErkJggg==" />{' '}
      </ToggleButton>
      <Container>
        <AvatarFigure>
          <img src={foodjpg} alt="맛집 사진" />
        </AvatarFigure>
        <Title>스미카츠</Title>
        <Address>서울 강남구 선릉로157길 23-3 지상 1층 101호</Address>
        <Content>
          카츠에 대해서 만큼은 단언컨데 최고라 자부하는 숯불 훈연 카츠,카츠동
          전문점 제주산 암퇘지 선별육 등심,안심,1++등급과 꽃목살 정중앙만
          사용하는 스미 카츠입니다
        </Content>
        <AddReview />
      </Container>
    </>
  );
}

const ToggleButton = styled.div`
  position: absolute;
  left: 400px;
  top: 320px;
  width: 50px;
  height: 230px;
  background-color: #fddf62;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  & img {
    margin-top: 90px;
  }
`;
