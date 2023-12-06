import styled from 'styled-components';

export const StContainer = styled.div`
  width: 400px;
  height: 100vh;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  border-radius: 0 20px 20px 0;
  align-items: center;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
`;

export const StAvatarFigure = styled.div`
  width: 300px;
  height: 200px;
  overflow: hidden;
  object-fit: cover;
  border-radius: 10px;
  margin: 30px 0;
  & img {
    width: 300px;
    height: 200px;
    overflow: hidden;
    object-fit: cover;
    border-radius: 10px;
  }
`;
export const StTitle = styled.div`
  text-align: center;
  width: 250px;
  font-size: 30px;
  margin-bottom: 15px;
  border-bottom: 5px solid blanchedalmond;
  border-radius: 15px;
  padding-bottom: 5px;
`;
export const StAddress = styled.div`
  width: 300px;
  font-size: 15px;
  margin-bottom: 10px;
  border-bottom: 5px solid blanchedalmond;
  line-height: 20px;
  border-radius: 10px;
  padding-bottom: 5px;
`;
export const StContent = styled.div`
  font-size: 16px;
  width: 300px;
  height: 135px;
  margin-bottom: 20px;
  line-height: 23px;
  border-bottom: 5px solid blanchedalmond;
  border-radius: 10px;
`;

// Toggle
export const StToggleButton = styled.div`
  position: absolute;
  left: 400px;
  top: 320px;
  width: 50px;
  height: 230px;
  background-color: #fddf62;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  & img {
    margin-top: 90px;
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.3);
    }
  }
`;

// AddReview
export const StListContainer = styled.div`
  width: 380px;
  height: 400px;
  border: 3px solid blanchedalmond;
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
    background-color: blanchedalmond;
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
  height: 130px;
  border-bottom: 5px solid blanchedalmond;
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  padding: 10px;
  border-radius: 10px;
  padding-bottom: 3px;
  margin-bottom: 5px;
  & img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }
`;

export const StCardContent = styled.p`
  font-size: 15px;
  padding: 5px 10px;
`;
