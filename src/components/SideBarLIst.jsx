import React from 'react';
import { StItemText, StList, StListItem } from '../style/StSideBar';
import { useDispatch, useSelector } from 'react-redux';
import CategoryIcon from './CategoryIcon';
import { listToggleOpen, toggleOpen } from '../redux/slices/ListDetailBarSlice';
import { setmarkerId } from '../redux/slices/markerSlice';

export default function SideBarLIst({ setIsListFindTarget }) {
  const storeList = useSelector((state) => state.place.place);
  console.log(storeList);
  const dispatch = useDispatch();
  return (
    <>
      <StList>
        {storeList ? (
          storeList?.map((place) => {
            return (
              <>
                <StListItem
                  onClick={() => {
                    dispatch(listToggleOpen(true));
                    dispatch(toggleOpen(false));

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
          })
        ) : (
          <h2>검색된 맛집이 없어요!</h2>
        )}
      </StList>
    </>
  );
}
