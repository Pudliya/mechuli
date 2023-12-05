import React from 'react';
import { ListContainer, Form, Card, CardContent } from '../style/StDetailBar';
export default function AddReview() {
  return (
    <ListContainer>
      <Form>
        <input type="text" placeholder="맛 한줄평을 남겨주세요~!" />
        <button>추가!</button>
      </Form>
      <Card>
        <CardContent>너무 맛있습니다!</CardContent>
      </Card>
      <Card>
        <CardContent>바삭 끝판왕..!</CardContent>
      </Card>
      <Card>
        <CardContent>최고!</CardContent>
      </Card>
    </ListContainer>
  );
}
