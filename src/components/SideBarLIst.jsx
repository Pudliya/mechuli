import React from 'react';
import { StItemText, StList, StListItem } from '../style/StSideBar';

export default function SideBarLIst() {
  const listArray = [
    {
      img: 'https://lh3.googleusercontent.com/a/ACg8ocLaP80xCrAJBkTaG3InkSmlzAL1-bAI-pdVIzWTLBOzuUs=s288-c-no',
      name: '맛집이름1',
      adress: '주소1'
    },
    {
      img: 'https://lh3.googleusercontent.com/pw/ADCreHfEvWMtJwapuZvDgx1xttkSWk-F30BL_rZtQQujRdjMQd1UoSIW7QbmIUcB69Hpl6NNuzjHzSc0Of3NM9pK0doz5Xu0DDE6AvACfcoLzDkn_mpXkYsBtsvao4sVHksncW1FjSiN2Rt_zmyz5dimLJkY=w1294-h1294-s-no-gm?authuser=0',
      name: '맛집이름2',
      adress: '주소2'
    },
    {
      img: 'https://lh3.googleusercontent.com/pw/ADCreHe7L7cNL0qy7QogIgfAEDvmKHVCIeIzZex4UTafpUARMYwkTlxV7WMimW62hKOPlJVTw0BD_WNy28sZFWhp4p3eCSMcZYXnOTCgSx034GqTMiZaDXAWkeMMOMiy2tgB_R5eD_QHjrZEJz8llgQLA9AV=w1294-h1294-s-no-gm?authuser=0',
      name: '맛집이름3',
      adress: '주소3'
    }
  ];
  return (
    <>
      <StList>
        {listArray.map((item) => {
          return (
            <>
              <StListItem>
                <img src={item.img} alt="" />
                <StItemText>
                  <p>{item.name}</p>
                  {item.adress}
                </StItemText>
              </StListItem>
            </>
          );
        })}
      </StList>
    </>
  );
}
