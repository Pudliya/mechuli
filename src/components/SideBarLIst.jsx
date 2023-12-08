import React from 'react';
import { StItemText, StList, StListItem } from '../style/StSideBar';
import { useSelector } from 'react-redux';
import CategoryIcon from './CategoryIcon';

export default function SideBarLIst() {
  const storeList = useSelector((state) => state.place.place);
  return (
    <>
      <StList>
        {storeList?.map((place) => {
          return (
            <>
              <StListItem>
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
