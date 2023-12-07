import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addPosts } from '../api/posts';
import {
  StCloseModal,
  StContainer,
  StModalBox,
  StImgFigure,
  StImgButton,
  StInputPassword,
  StModalContent,
  StButtons
} from '../style/StDetailModal';

function DetailModal({ isModal, setIsModal }) {
  const [selectedImg, setSelectedImg] = useState();
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(addPosts, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });

  const previewImg = (event) => {
    const imgFile = event.target.files[0];
    setFile(imgFile);
    if (imgFile) {
      const imgUrl = URL.createObjectURL(imgFile);
      setSelectedImg(imgUrl);
    } else {
      return;
    }
  };

  //post 추가
  const onAddPostButtonHandler = () => {
    const newPost = {
      content,
      img: selectedImg,
      password
    };
    mutation.mutate(newPost);
    setContent('');
    setPassword('');
  };

  return (
    <>
      {isModal ? (
        <>
          <StCloseModal
            onClick={() => {
              const answer = window.confirm(
                '작성한 내용이 되지 않습니다. 그래도 나가시겠습니까?'
              );
              if (!answer) return;
              setSelectedImg(null);
              setContent('');
              setIsModal(false);
            }}
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAvklEQVR4nO2VTQqDMBBG30qXhi7b+9gcvQr1Ku0NLIERQvAnjkmLNB+4kfnmZZJJBoqK/k034A7UOzwu1opXDX0DI9ABJsJjJNZ5XsBVA7aSYPr6DbiRGN/TasCVt/ot+Bz0ITlUaiSBn3AALkFMuMBnEJMcng26tpX9wr+YJjxcebZKY+FZoSyc6VzDfQU65oSbXzRXs3JlYu55cuik5PD64JPZaZ9Mm2BIuJF6nrGIGNudW1ZJpWpoUdE59QFWDIMmRvQTIgAAAABJRU5ErkJggg==" />
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
              <StInputPassword
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></StInputPassword>
              <StModalContent
                value={content}
                onChange={contentHandler}
                placeholder="리뷰 작성란"
              ></StModalContent>
              <StButtons
                onClick={() => {
                  if (content === '' || password === '') {
                    alert('내용과 비밀번호 작성해주시길 바랍니다.');
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
