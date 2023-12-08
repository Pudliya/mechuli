import AddReview from './AddReview';
import foodjpg from '../assets/foodtest.jpg';
import {
  StContainer,
  StAvatarFigure,
  StTitle,
  StAddress,
  StDetailbarCloseButton,
  StInfo
} from '../style/StDetailBar';
import DetailModal from './DetailModal';
import { useState } from 'react';
import DetailRemoveModa from './DetailRemoveModa';

export default function DetailBar({ isOpenDetailBar, setIsOpneDetailBar }) {
  const [isModal, setIsModal] = useState(false);
  const [isRemoveModal, setIsRemoveModal] = useState(false);
  const [foundTarget, setFoundTarget] = useState('');

  return (
    <>
      <StDetailbarCloseButton
        className={isOpenDetailBar ? 'close' : ''}
        onClick={() => {
          setIsOpneDetailBar((isOpenDetailBar) => !isOpenDetailBar);
        }}
      >
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAvklEQVR4nO2VTQqDMBBG30qXhi7b+9gcvQr1Ku0NLIERQvAnjkmLNB+4kfnmZZJJBoqK/k034A7UOzwu1opXDX0DI9ABJsJjJNZ5XsBVA7aSYPr6DbiRGN/TasCVt/ot+Bz0ITlUaiSBn3AALkFMuMBnEJMcng26tpX9wr+YJjxcebZKY+FZoSyc6VzDfQU65oSbXzRXs3JlYu55cuik5PD64JPZaZ9Mm2BIuJF6nrGIGNudW1ZJpWpoUdE59QFWDIMmRvQTIgAAAABJRU5ErkJggg=="
          alt="사이드바 닫기"
        />
      </StDetailbarCloseButton>

      <StContainer className={isOpenDetailBar ? 'active' : ''}>
        <StAvatarFigure>
          <img src={foodjpg} alt="맛집 사진" />
        </StAvatarFigure>
        <StTitle>스미카츠</StTitle>
        <StInfo>서울 강남구 선릉로157길 23-3 지상 1층 101호</StInfo>

        <AddReview
          setIsModal={setIsModal}
          setIsRemoveModal={setIsRemoveModal}
          setFoundTarget={setFoundTarget}
        />
        <DetailModal isModal={isModal} setIsModal={setIsModal} />
        <DetailRemoveModa
          isRemoveModal={isRemoveModal}
          setIsRemoveModal={setIsRemoveModal}
          foundTarget={foundTarget}
        />
      </StContainer>
    </>
  );
}