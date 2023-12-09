import styled from 'styled-components';

export const StListDetailBarContainer = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 3;
  margin-left: -400px;
  width: 400px;
  height: 100vh;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-color: blanchedalmond;
  display: flex;
  flex-direction: column;
  border-radius: 0 20px 20px 0;
  align-items: center;
  padding: 20px;
  transition: all 0.4s ease-in-out;
  &.activee {
    margin-left: 385px;
  }
`;

export const StListDetailBarAvatarFigure = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 10px;
  margin-top: 30px;
  & svg {
    width: 200px;
    height: 200px;
    margin-left: 50px;
  }
`;
export const StListDetailBarTitle = styled.div`
  text-align: center;
  width: 380px;
  font-size: 30px;
  margin-bottom: 15px;
  border-bottom: 5px solid #fdd5a5;
  border-radius: 15px;
  padding-bottom: 5px;
`;
export const StListDetailBarInfo = styled.div`
  width: 380px;
  font-size: 15px;
  margin-bottom: 10px;
  border-bottom: 5px solid #fdd5a5;
  line-height: 20px;
  border-radius: 10px;
  padding-bottom: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  & img {
    width: 20px;
    height: 20px;
  }
  & p > img {
    margin-bottom: -5px;
  }
`;

export const StListDetailbarCloseButton = styled.div`
  position: absolute;
  z-index: 3;
  margin-left: -480px;
  left: 380px;
  top: 60px;
  width: 80px;
  height: 80px;
  background-color: #fddf62;
  border-radius: 0 10px 10px 0;
  scale: 0.6;
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  &:hover {
    & img {
      transform: scale(1.3);
    }
  }
  & img {
    margin-top: 25px;
    margin-left: 23px;
    transition: all 0.1s ease-in-out;
    scale: 1.5;
  }
  transition: all 0.4s ease-in-out;
  &.closee {
    margin-left: 385px;
  }
`;
