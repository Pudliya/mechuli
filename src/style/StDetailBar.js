import styled from 'styled-components';

export const Container = styled.div`
  width: 400px;
  height: 100vh;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  border-radius: 0 20px 20px 0;
  align-items: center;
  padding: 20px;
`;

export const AvatarFigure = styled.div`
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
export const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 10px;
`;
export const Address = styled.h2`
  width: 250px;
  font-size: 18px;
  margin-bottom: 10px;
`;
export const Content = styled.p`
  font-size: 16px;
  width: 300px;
  height: 100px;
  margin-bottom: 20px;
  line-height: 20px;
`;

// AddReview
export const ListContainer = styled.div`
  width: 300px;
  height: 400px;
  border: 3px solid blanchedalmond;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
`;
export const Form = styled.form`
  width: 280px;
  height: 35px;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  & input {
    font-size: 15px;
    border-radius: 5px;
    border: none;
    padding: 10px;
    outline: 0;
  }
  & button {
    padding: 5px 10px;
    border: 0;
    border-radius: 10px;
    background-color: blanchedalmond;
    transition: all 0.2s ease-in-out;
    font-weight: 700;
    color: brown;
    cursor: pointer;
    &:hover {
      background-color: white;
      transform: scale(1.1);
    }
  }
`;

export const Card = styled.div`
  width: 260px;
  height: 40px;
  border: 3px solid salmon;
  margin-top: 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
`;

export const CardContent = styled.p`
  font-size: 15px;
  padding: 5px 10px;
`;
