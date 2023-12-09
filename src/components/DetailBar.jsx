import AddReview from './AddReview';
import {
  StContainer,
  StAvatarFigure,
  StTitle,
  StDetailbarCloseButton,
  StInfo
} from '../style/StDetailBar';
import DetailModal from './DetailModal';
import { useState } from 'react';
import DetailRemoveModa from './DetailRemoveModa';
import { useSelector } from 'react-redux';
import CategoryIcon from './CategoryIcon';
import markerImg from '../assets/marker/defaultMarker.png';
import callImg from '../assets/marker/call.png';

export default function DetailBar({
  isOpenDetailBar,
  setIsOpneDetailBar,
  listFindTarget
}) {
  const [isModal, setIsModal] = useState(false);
  const [isRemoveModal, setIsRemoveModal] = useState(false);
  const [foundTarget, setFoundTarget] = useState('');
  const placeList = useSelector((state) => state.place.place);

  const findId = useSelector((state) => state.marker.markerId);

  return (
    <>
      {placeList?.map((item) => {
        if (item.id === findId) {
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
                  <CategoryIcon category={item.category_name} />
                </StAvatarFigure>
                <StTitle>{item.place_name}</StTitle>
                <StInfo>
                  <h1>
                    <img src={markerImg} alt="marker" />
                    {item.address_name}
                  </h1>
                  <p>
                    <img src={callImg} alt="call" />
                    {item.phone}
                  </p>
                </StInfo>

                <AddReview
                  setIsModal={setIsModal}
                  setIsRemoveModal={setIsRemoveModal}
                  setFoundTarget={setFoundTarget}
                  listFindTarget={listFindTarget}
                />
              </StContainer>
              <DetailModal
                isModal={isModal}
                setIsModal={setIsModal}
                listFindTarget={listFindTarget}
              />
              <DetailRemoveModa
                isRemoveModal={isRemoveModal}
                setIsRemoveModal={setIsRemoveModal}
                foundTarget={foundTarget}
              />
            </>
          );
        }
      })}
    </>
  );
}
