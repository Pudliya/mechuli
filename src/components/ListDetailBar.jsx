import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StListDetailbarCloseButton,
  StListDetailBarContainer,
  StListDetailBarAvatarFigure,
  StListDetailBarInfo,
  StListDetailBarTitle
} from '../style/StListDetailBar';
import CategoryIcon from './CategoryIcon';
import markerImg from '../assets/marker/defaultMarker.png';
import callImg from '../assets/marker/call.png';
import AddReview from './AddReview';
import DetailModal from './DetailModal';
import DetailRemoveModa from './DetailRemoveModa';
import { listToggleOpen } from '../redux/slices/ListDetailBarSlice';

export default function ListDetailBar({ listFindTarget }) {
  const [isModal, setIsModal] = useState(false);
  const [isRemoveModal, setIsRemoveModal] = useState(false);
  const [foundTarget, setFoundTarget] = useState('');
  const placeList = useSelector((state) => state.place.place);

  const listDetailBar = useSelector((state) => state.listDetail.listToggle);
  const dispatch = useDispatch();

  return (
    <>
      {placeList?.map((item) => {
        if (item.id === listFindTarget) {
          return (
            <>
              <StListDetailbarCloseButton
                className={listDetailBar ? 'closee' : ''}
                onClick={() => {
                  dispatch(listToggleOpen(!listDetailBar));
                }}
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAvklEQVR4nO2VTQqDMBBG30qXhi7b+9gcvQr1Ku0NLIERQvAnjkmLNB+4kfnmZZJJBoqK/k034A7UOzwu1opXDX0DI9ABJsJjJNZ5XsBVA7aSYPr6DbiRGN/TasCVt/ot+Bz0ITlUaiSBn3AALkFMuMBnEJMcng26tpX9wr+YJjxcebZKY+FZoSyc6VzDfQU65oSbXzRXs3JlYu55cuik5PD64JPZaZ9Mm2BIuJF6nrGIGNudW1ZJpWpoUdE59QFWDIMmRvQTIgAAAABJRU5ErkJggg=="
                  alt="사이드바 닫기"
                />
              </StListDetailbarCloseButton>

              <StListDetailBarContainer
                className={listDetailBar ? 'activee' : ''}
              >
                <StListDetailBarAvatarFigure>
                  <CategoryIcon category={item.category_name} />
                </StListDetailBarAvatarFigure>
                <StListDetailBarTitle>{item.place_name}</StListDetailBarTitle>
                <StListDetailBarInfo>
                  <h1>
                    <img src={markerImg} alt="marker" />
                    {item.address_name}
                  </h1>
                  <p>
                    <img src={callImg} alt="call" />
                    {item.phone}
                  </p>
                </StListDetailBarInfo>

                <AddReview
                  setIsModal={setIsModal}
                  setIsRemoveModal={setIsRemoveModal}
                  setFoundTarget={setFoundTarget}
                  listFindTarget={listFindTarget}
                />
              </StListDetailBarContainer>
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
