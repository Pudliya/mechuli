import React from 'react';
import KoreanFood from '../assets/icon/KoreanFood';
import WesternFood from '../assets/icon/WesternFood';
import ChineseFood from '../assets/icon/ChineseFood';
import JapaneseFood from '../assets/icon/JapaneseFood';
import DefaultIcon from '../assets/icon/DefaultIcon';
// const a = {
//   한식: <ChineseFood />
// };
// a['한식'];
export default function CategoryIcon({ category }) {
  const category_name = category.split('>')[1].trim();
  switch (category_name) {
    case '한식':
      return <KoreanFood />;
    case '양식':
      return <WesternFood />;

    case '중식':
      return <ChineseFood />;

    case '일식':
      return <JapaneseFood />;

    default:
      return <DefaultIcon />;
  }
}
