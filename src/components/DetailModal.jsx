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
import { StDeleteImage } from '../style/StAddSlider';

function DetailModal({ isModal, setIsModal }) {
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  const [showImages, setShowImages] = useState([]);

  // 이미지 상대경로 저장
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 3) {
      imageUrlLists = imageUrlLists.slice(0, 3);
    }
    setShowImages(imageUrlLists);
  };

  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(addPosts, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });

  //post 추가
  const onAddPostButtonHandler = () => {
    const newPost = {
      content,
      img: showImages,
      password
    };
    mutation.mutate(newPost);
    setShowImages([]);
    setContent('');
    setPassword('');
  };

  return (
    <>
      {isModal ? (
        <>
          <StContainer>
            <StCloseModal
              onClick={() => {
                const answer = window.confirm(
                  '작성한 내용이 저장되지 않습니다. 그래도 나가시겠습니까?'
                );
                if (!answer) return;
                setShowImages([]);
                setContent('');
                setIsModal(false);
                setPassword('');
              }}
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAvklEQVR4nO2VTQqDMBBG30qXhi7b+9gcvQr1Ku0NLIERQvAnjkmLNB+4kfnmZZJJBoqK/k034A7UOzwu1opXDX0DI9ABJsJjJNZ5XsBVA7aSYPr6DbiRGN/TasCVt/ot+Bz0ITlUaiSBn3AALkFMuMBnEJMcng26tpX9wr+YJjxcebZKY+FZoSyc6VzDfQU65oSbXzRXs3JlYu55cuik5PD64JPZaZ9Mm2BIuJF6nrGIGNudW1ZJpWpoUdE59QFWDIMmRvQTIgAAAABJRU5ErkJggg=="
                alt="닫기"
              />
            </StCloseModal>

            <StModalBox>
              <StImgFigure>
                {showImages.map((image, id) => (
                  <div key={id}>
                    <img src={image} alt={`${image}-${id}`} />
                    <StDeleteImage onClick={() => handleDeleteImage(id)}>
                      <p>X</p>
                    </StDeleteImage>
                  </div>
                ))}
              </StImgFigure>
              <StImgButton>
                <label>
                  <input
                    type="file"
                    onChange={handleAddImages}
                    accept="image/jpg, image/png"
                  />
                  <p>이미지 업로드</p>
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
                placeholder="리뷰 작성해주세요~!"
              ></StModalContent>
              <StButtons
                onClick={() => {
                  if (content === '' || password === '') {
                    alert('내용과 비밀번호 작성해주시길 바랍니다.');
                    return false;
                  }
                  onAddPostButtonHandler();
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
