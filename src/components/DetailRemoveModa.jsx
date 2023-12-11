import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { getPosts, removePost } from '../api/posts';

export default function DetailRemoveModa({
  isRemoveModal,
  setIsRemoveModal,
  foundTarget
}) {
  const [password, setIspassword] = useState('');
  const { data } = useQuery('posts', getPosts);

  const queryClient = useQueryClient();
  const mutation = useMutation(removePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });

  const onDeleteButtonHandler = (id) => {
    const answer = window.confirm('삭제 하시겠습니까?');
    if (!answer) return;

    mutation.mutate(id);
  };

  return (
    <>
      {data
        ?.filter((item) => item.id === foundTarget)
        ?.map((item) => {
          return (
            <>
              {isRemoveModal ? (
                <>
                  <StContainer>
                    <StModalBox>
                      비밀번호
                      <input
                        value={password}
                        onChange={(e) => {
                          setIspassword(e.target.value);
                        }}
                        type="password"
                      />
                      <StButtons>
                        <button
                          onClick={() => {
                            if (password === item.password) {
                              onDeleteButtonHandler(item.id);
                            } else {
                              alert('비밀번호가 일치하지 않습니다.');
                            }
                            setIspassword('');
                            setIsRemoveModal(false);
                          }}
                        >
                          삭제
                        </button>
                        <button
                          onClick={() => {
                            setIsRemoveModal(false);
                          }}
                        >
                          취소
                        </button>
                      </StButtons>
                    </StModalBox>
                  </StContainer>
                </>
              ) : null}
            </>
          );
        })}
    </>
  );
}

const StContainer = styled.div`
  backdrop-filter: blur(0.5rem);
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;

const StModalBox = styled.div`
  position: absolute;
  z-index: 3;
  width: 300px;
  height: 200px;
  background-color: #fdd5a5;
  border: 5px solid #fddf62;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  gap: 10px;
  font-weight: 700;
  & input {
    padding: 5px;
    border: 3px solid blanchedalmond;
    padding: 5px 8px;
    outline: 0;
    border-radius: 20px;
  }
`;

const StButtons = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 20px;
  & button {
    font-weight: 700;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    background-color: blanchedalmond;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.1);
      background-color: #fddf62;
    }
  }
`;
