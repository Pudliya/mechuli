import {
  StContainer,
  StAvatarFigure,
  StTitle,
  StDetailbarCloseButton,
  StInfo
} from '../style/StDetailBar';
import { useSelector } from 'react-redux';
import CategoryIcon from './CategoryIcon';
import markerImg from '../assets/marker/defaultMarker.png';
import callImg from '../assets/marker/call.png';
import { IoClose } from 'react-icons/io5';

export default function DetailBar({ isOpenDetailBar, setIsOpneDetailBar }) {
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
                <IoClose size={55} />
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
              </StContainer>
            </>
          );
        }
      })}
    </>
  );
}
