import AddReview from './AddReview';
import foodjpg from '../assets/foodtest.jpg';
import {
  StContainer,
  StAvatarFigure,
  StTitle,
  StAddress,
  StContent,
  StToggleButton,
  StDetailbarCloseButton
} from '../style/StDetailBar';
import DetailModal from './DetailModal';
import { useEffect, useState } from 'react';
import DetailRemoveModa from './DetailRemoveModa';
import axios from 'axios';

export default function DetailBar() {
  const [isModal, setIsModal] = useState(false);
  const [isRemoveModal, setIsRemoveModal] = useState(false);
  const [isOpenDetailBar, setIsOpneDetailBar] = useState(false);

  const [fonudData, setFoundData] = useState('');

  const kakaofetchData = async () => {
    const searching = '이태원 맛집';
    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${searching}`,
      {
        headers: {
          Authorization: 'KakaoAK f700a94a8b535d4fe5e70407a5482308'
        }
      }
    );

    setFoundData(data?.documents[0]);
  };

  useEffect(() => {
    kakaofetchData();
  }, []);

  return (
    <>
      <StDetailbarCloseButton
        className={isOpenDetailBar ? 'close' : ''}
        onClick={() => {
          setIsOpneDetailBar((isOpenDetailBar) => !isOpenDetailBar);
        }}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAvklEQVR4nO2VTQqDMBBG30qXhi7b+9gcvQr1Ku0NLIERQvAnjkmLNB+4kfnmZZJJBoqK/k034A7UOzwu1opXDX0DI9ABJsJjJNZ5XsBVA7aSYPr6DbiRGN/TasCVt/ot+Bz0ITlUaiSBn3AALkFMuMBnEJMcng26tpX9wr+YJjxcebZKY+FZoSyc6VzDfQU65oSbXzRXs3JlYu55cuik5PD64JPZaZ9Mm2BIuJF6nrGIGNudW1ZJpWpoUdE59QFWDIMmRvQTIgAAAABJRU5ErkJggg==" />
      </StDetailbarCloseButton>

      <StToggleButton
        onClick={() =>
          setIsOpneDetailBar((isOpenDetailBar) => !isOpenDetailBar)
        }
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABP0lEQVR4nO2ZwU7DMAxA3YSuRRzoDul2aJMJVVrL1V+0fxwScNh+inLgEhS2okEjdoLZxU+Kcn6yk9gxgCAIwm+DiKm7u9+EHbiCiGnt2sfKrt8qt35iKYNHiXLh+kQpbxa2r227a5omA5YSSeIBwIedlQweJczSvQwSwzrIuNfatg/ASaKYl15pzUsEv6VTkJjN8pjEjmxqiQQVJBJUkEhQjUSe30SuWOKvN0bKjvGrLRKXOdjjsoNZJIpo2cFMAgC81le8JAKhQh2q2NvCfEmnsExp+8p1z+S7vtp120HkNBLsRPAztVZnrttuTzq1YjJKaZ+m2TRkinBzZdcic3EkMlTB/3lmWtqvfkBkqCKRocokI2NOPrHHPYyj/Yk9qbHCTy0Ai9/4szIfozeGErFhaNjJd5OTH08LggB/yjs9cakIk7pOHwAAAABJRU5ErkJggg==" />{' '}
      </StToggleButton>

      <StContainer className={isOpenDetailBar ? 'active' : ''}>
        <StAvatarFigure>
          <img src={foodjpg} alt="맛집 사진" />
        </StAvatarFigure>
        <StTitle>{fonudData.place_name}</StTitle>
        <StAddress>{fonudData.address_name}</StAddress>
        <StContent>
          <p>{fonudData.phone}</p>
        </StContent>
        <AddReview
          setIsModal={setIsModal}
          setIsRemoveModal={setIsRemoveModal}
        />
        <DetailModal isModal={isModal} setIsModal={setIsModal} />
        <DetailRemoveModa
          isRemoveModal={isRemoveModal}
          setIsRemoveModal={setIsRemoveModal}
        />
      </StContainer>
    </>
  );
}
