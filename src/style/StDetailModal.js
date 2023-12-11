import styled from 'styled-components';

export const StContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 100%;
  height: 100%;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

export const StModalBox = styled.div`
  background-color: blanchedalmond;
  width: 550px;
  height: 650px;
  border: 5px solid #fddf62;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  padding: 0 10px;
`;

export const StImgFigure = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;

  & img {
    width: 150px;
    height: 150px;
    margin-right: 10px;
    border-radius: 10px;
  }
`;

export const StModalContent = styled.textarea`
  font-size: 16px;
  width: 400px;
  height: 200px;
  resize: none;
  padding: 10px;
  outline: none;
  border: 3px solid #fdd5a5;
  border-radius: 10px;
`;

export const StButtons = styled.button`
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 10px 20px;
  border: 0;
  border-radius: 10px;
  background-color: #fdd5a5;
  transition: all 0.2s ease-in-out;
  font-weight: 700;
  color: brown;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

export const StImgButton = styled.div`
  border: 3px solid #fdd5a5;
  border-radius: 20px;
  text-align: center;
  width: 110px;
  & input {
    display: none;
  }
  & p {
    cursor: pointer;
    font-size: 12px;
    color: brown;
    padding: 10px;
  }
`;

export const StCloseModal = styled.div`
  position: absolute;
  border-radius: 10px 10px 0 0;
  top: calc(50% - 338px);
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 200px;
  height: 30px;
  z-index: 4;
  background-color: #fddf62;
  cursor: pointer;
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
    margin-left: 85px;
    margin-top: 3px;
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const StInputPassword = styled.input`
  border: 3px solid #fdd5a5;
  padding: 5px 8px;
  outline: 0;
  border-radius: 20px;
`;
