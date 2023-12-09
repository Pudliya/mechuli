import React from 'react';
import { StItemText, StList, StListItem } from '../style/StSideBar';
import { useDispatch, useSelector } from 'react-redux';
import CategoryIcon from './CategoryIcon';
import { listToggleOpen } from '../redux/slices/ListDetailBarSlice';
import { setmarkerId } from '../redux/slices/markerSlice';

export default function SideBarLIst({
  setIsOpenListDetailBar,
  setIsListFindTarget
}) {
  const storeList = useSelector((state) => state.place.place);
  const dispatch = useDispatch();
  return (
    <>
      <StList>
        {storeList?.map((place) => {
          return (
            <>
              <StListItem
                onClick={() => {
                  dispatch(listToggleOpen(true));

                  setIsListFindTarget(place.id);
                }}
              >
                <CategoryIcon category={place.category_name} />
                <StItemText>
                  <p>{place.place_name}</p>
                  {place.road_address_name}
                </StItemText>
              </StListItem>
            </>
          );
        })}
      </StList>
    </>
  );
}
