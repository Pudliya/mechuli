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
import SlideModal from './SlideModal';
import { useSelector } from 'react-redux';
export default function AddReview({
  setIsModal,
  setIsRemoveModal,
  setFoundTarget,
  listFindTarget
}) {
  // posts 조회
  const { isLoading, isError, data } = useQuery('posts', getPosts);

  const placeId = useSelector((state) => state.marker.markerId);

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
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO3XsUrEQBCA4R9ECwWrO9TSwjfQs/Ut7AQVBFsbO19Aq0M47HwCn0DB00ILIainthbiGwRBwTsGJhCXZE121mBxA9OEyX6bZBkm8A9iCtgGjoGTgDwCpkvWXgZ2gQ1g0UVvgS/gAbgLyD7QckDZyBkwzKUYe1mBPOknsBLxDQp64aBDzausqAsMGkIHwFxW2AOSiOh5CfoCLOSLY8G10Fjwb+h80U1WOAi1wj702YdaYN/plX7QdurbbpMJhXdqoBLXwCEGeEK71Axw6aD3JShqiBUMHwApsKb4WwXUDE8C7wql2vVSRd1eHRVeL/imVVAz3M+BH8BpRdQEzwLfwCuwXwOM8sRLeqpDIrGe6tBIxnBv/KqbOlzdyMNeWTyphTvedv4QXdWZessd6G+MA70vH3VtMcT6EXJBdhP6C+NLWXOzCG08Rl3mz12dLnxuAAAAAElFTkSuQmCC"
            alt="리뷰 작성"
          />
        </button>
      </StForm>

      {data.map((item) => {
        // console.log(item.placeId === (placeId === listFindTarget));
        console.log('item.placeId', item.placeId);
        console.log('placeId', placeId);
        console.log('listFindTarget', listFindTarget);
        console.log('--------------------------------');
        console.log('item.placeId == placeId', item.placeId == placeId);
        console.log('placeId == listFindTarget', placeId == listFindTarget);
        console.log(
          'item.placeId == listFindTarget',
          item.placeId == listFindTarget
        );
        console.log('--------------------------------');

        console.log(item.placeId);
        if (item.placeId === placeId || item.placeId === listFindTarget) {
          return (
            <>
              <StCard key={item.id}>
                {item.img == '' ? (
                  <>
                    <StCardContent>{item.content}</StCardContent>
                  </>
                ) : (
                  <>
                    <SlideModal imgurl={item.img} />
                    <StCardContent>{item.content}</StCardContent>
                  </>
                )}
              </StCard>
              <StReviewDeleteButton
                onClick={() => {
                  setIsRemoveModal(true);
                  setFoundTarget(item.id);
                }}
              >
                삭제
              </StReviewDeleteButton>
            </>
          );
        }
      })}
    </StListContainer>
  );
}
