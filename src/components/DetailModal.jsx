import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { addPosts } from '../api/posts';

function DetailModal({ isModal, setIsModal }) {
  const [selectedImg, setSelectedImg] = useState();
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(addPosts, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      console.log('저장하였습니다.');
    }
  });

  const previewImg = (event) => {
    const imgFile = event.target.files[0];
    setFile(imgFile);
    const imgUrl = URL.createObjectURL(imgFile);
    setSelectedImg(imgUrl);
  };

  //post 추가
  const onAddPostButtonHandler = () => {
    const newPost = {
      content,
      img: selectedImg
    };
    mutation.mutate(newPost);
    setContent('');
  };

  return (
    <>
      {isModal ? (
        <>
          <StCloseModal
            onClick={() => {
              const answer = window.confirm(
                '작성한 내용이 사라질 수도 있습니다.'
              );
              if (!answer) return;
              setSelectedImg(null);
              setContent('');
              setIsModal(false);
            }}
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAm0lEQVR4nO2VOw6DMBAF5wyBhMOsXOT+lwlBqUFILsACwmefaHYqCmvGFrCGIAgEVMALHQ3wXIp+gC+QBNGU3WOjLsMt0AOdczxlZ58bj3KB5V2NC37A2yG622mO8cMuc4ifdtiF+OWN2wmB26uyAyL3j9N2CBV/xF+xLLoVkEeXplBXPCtG7YzpKeUnXRv6qktlk7q8aYIg4A4GvjhVL0r+uzAAAAAASUVORK5CYII=" />
          </StCloseModal>
          <StContainer>
            <StModalBox>
              <StImgFigure>
                <img src={selectedImg} />
              </StImgFigure>
              <StImgButton>
                <label>
                  <input
                    type="file"
                    onChange={previewImg}
                    accept="image/jpg, image/png"
                  />
                  <p>이미지 선택</p>
                </label>
              </StImgButton>
              <StModalContent
                value={content}
                onChange={contentHandler}
                placeholder="리뷰 작성란"
              ></StModalContent>
              <StButtons
                onClick={() => {
                  if (content === '') {
                    alert('작성된 내용이 없습니다.');
                    return false;
                  }
                  onAddPostButtonHandler();
                  setSelectedImg(null);
                  setContent('');
                  setIsModal(false);
                }}
              >
                추가!
              </StButtons>
            </StModalBox>
          </StContainer>
        </>
      ) : null}
    </>
  );
}

export default DetailModal;

const StContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 655px;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StModalBox = styled.div`
  width: 500px;
  height: 650px;
  border: 5px solid #fdd5a5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  padding: 0 10px;
`;

const StImgFigure = styled.div`
  margin-top: 20px;

  & img {
    width: 400px;
    overflow: hidden;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const StModalContent = styled.textarea`
  font-size: 16px;
  width: 400px;
  height: 200px;
  resize: none;
  padding: 10px;
  outline: none;
  border: 3px solid blanchedalmond;
  border-radius: 10px;
`;

const StButtons = styled.button`
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 10px 20px;
  border: 0;
  border-radius: 10px;
  background-color: blanchedalmond;
  transition: all 0.2s ease-in-out;
  font-weight: 700;
  color: brown;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const StImgButton = styled.div`
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

const StCloseModal = styled.div`
  position: absolute;
  border-radius: 10px 10px 0 0;
  left: 760px;
  top: 100px;
  width: 200px;
  height: 30px;
  z-index: 4;
  background-color: #fddf62;
  & img {
    margin-left: 85px;
    margin-top: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.2);
    }
  }
`;
