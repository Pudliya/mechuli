import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import callImg from '../assets/marker/call.png';
import markerImg from '../assets/marker/defaultMarker.png';
import { toggleOpen } from '../redux/slices/ListDetailBarSlice';
import {
  StAvatarFigure,
  StContainer,
  StDetailbarCloseButton,
  StInfo,
  StTitle
} from '../style/StDetailBar';
import CategoryIcon from './CategoryIcon';

export default function DetailBar() {
  const placeList = useSelector((state) => state.place.place);

  const findId = useSelector((state) => state.marker.markerId);
  const toggle = useSelector((state) => state.listDetail.toggle);

  const dispatch = useDispatch();

  return (
    <>
      {placeList?.map((item) => {
        if (item.id === findId) {
          return (
            <>
              <StDetailbarCloseButton
                className={toggle ? 'close' : ''}
                onClick={() => {
                  dispatch(toggleOpen(!toggle));
                }}
              >
                <IoClose size={55} />
              </StDetailbarCloseButton>

              <StContainer className={toggle ? 'active' : ''}>
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
