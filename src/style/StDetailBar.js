import styled from 'styled-components';

export const StContainer = styled.div`
  position: absolute;
  top: 51px;
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
  &.active {
    margin-left: 0;
  }
`;

export const StAvatarFigure = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 10px;
  margin: 30px 0;
  & img {
    width: 300px;
    height: 200px;
    border-radius: 10px;
  }
`;
export const StTitle = styled.div`
  text-align: center;
  width: 300px;
  font-size: 30px;
  margin-bottom: 15px;
  border-bottom: 5px solid #fdd5a5;
  border-radius: 15px;
  padding-bottom: 5px;
`;
export const StInfo = styled.div`
  width: 300px;
  font-size: 15px;
  margin-bottom: 10px;
  border-bottom: 5px solid #fdd5a5;
  line-height: 20px;
  border-radius: 10px;
  padding-bottom: 5px;
  text-align: center;
`;

export const StDetailbarCloseButton = styled.div`
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
  &.close {
    margin-left: 0;
  }
`;

// AddReview
export const StListContainer = styled.div`
  width: 380px;
  height: 400px;
  border: 3px solid #fdd5a5;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const StForm = styled.form`
  width: 380px;
  height: 35px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  font-size: 20px;
  color: brown;
  font-weight: 700;
  & input {
    width: 230px;
    font-size: 15px;
    border-radius: 5px;
    border: none;
    padding: 10px;
    outline: 0;
  }
  & button {
    border: 0;
    border-radius: 10px;
    background-color: #fdd5a5;
    transition: all 0.2s ease-in-out;
    font-weight: 700;
    color: brown;
    cursor: pointer;
    margin-left: 150px;
    &:hover {
      background-color: white;
      transform: scale(1.1);
    }
  }
`;

export const StCard = styled.div`
  width: 350px;
  border-bottom: 5px solid blanchedalmond;
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  padding: 10px;
  border-radius: 10px;
  padding-bottom: 3px;
  margin-bottom: 5px;
  animation: modal-show 0.5s;
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  & img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 5px;
  }
`;

export const StCardContent = styled.p`
  font-size: 15px;
  padding: 5px 10px;
`;

export const StReviewDeleteButton = styled.button`
  border: 0;
  border-radius: 10px;
  background-color: blanchedalmond;
  transition: all 0.2s ease-in-out;
  font-weight: 700;
  color: brown;
  cursor: pointer;
  margin-left: 250px;
  padding: 5px 8px;
  margin-top: 5px;
  &:hover {
    background-color: white;
    transform: scale(1.1);
  }
`;
