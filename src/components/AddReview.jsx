import React from 'react';
import {
  StListContainer,
  StForm,
  StCard,
  StCardContent,
  StReviewDeleteButton
} from '../style/StDetailBar';
import { getPosts } from '../api/posts';
import { useQuery } from 'react-query';
export default function AddReview({ setIsModal, setIsRemoveModal }) {
  // posts 조회
  const { isLoading, isError, data } = useQuery('posts', getPosts);

  if (isLoading) {
    return (
      <StCard>
        <StCardContent>로딩중...</StCardContent>
      </StCard>
    );
  }

  if (isError) {
    return (
      <StCard>
        <StCardContent>불러오기를 실패하였습니다.</StCardContent>
      </StCard>
    );
  }

  return (
    <StListContainer>
      <StForm>
        <p>Review</p>
        <button
          onClick={() => {
            setIsModal(true);
          }}
          type="button"
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO3XsUrEQBCA4R9ECwWrO9TSwjfQs/Ut7AQVBFsbO19Aq0M47HwCn0DB00ILIainthbiGwRBwTsGJhCXZE121mBxA9OEyX6bZBkm8A9iCtgGjoGTgDwCpkvWXgZ2gQ1g0UVvgS/gAbgLyD7QckDZyBkwzKUYe1mBPOknsBLxDQp64aBDzausqAsMGkIHwFxW2AOSiOh5CfoCLOSLY8G10Fjwb+h80U1WOAi1wj702YdaYN/plX7QdurbbpMJhXdqoBLXwCEGeEK71Axw6aD3JShqiBUMHwApsKb4WwXUDE8C7wql2vVSRd1eHRVeL/imVVAz3M+BH8BpRdQEzwLfwCuwXwOM8sRLeqpDIrGe6tBIxnBv/KqbOlzdyMNeWTyphTvedv4QXdWZessd6G+MA70vH3VtMcT6EXJBdhP6C+NLWXOzCG08Rl3mz12dLnxuAAAAAElFTkSuQmCC" />
        </button>
      </StForm>
      {data.map((item) => {
        return (
          <>
            <StCard key={item.id}>
              {item.img === null ? (
                <StCardContent>{item.content}</StCardContent>
              ) : (
                <>
                  <img src={item.img} />
                  <StCardContent>{item.content}</StCardContent>
                </>
              )}
            </StCard>
            <StReviewDeleteButton
              onClick={() => {
                setIsRemoveModal(true);
              }}
            >
              삭제
            </StReviewDeleteButton>
          </>
        );
      })}
    </StListContainer>
  );
}