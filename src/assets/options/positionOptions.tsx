//각 포지션을 한글 표기로 바꾸는 객체
export const positionToKorean: { [item: string]: string } = {
  'Electric Guitar': '일렉기타',
  'Acoustic Guitar': '어쿠스틱',
  Drum: '드럼',
  'Bass Guitar': '베이스',
  Keyboard: '키보드',
  Vocal: '보컬',
  Others: '그 외',
};

const positionOptions = [
  {
    id: 1,
    name: 'Electric Guitar',
  },
  {
    id: 2,
    name: 'Acoustic Guitar',
  },
  {
    id: 3,
    name: 'Drum',
  },
  {
    id: 4,
    name: 'Bass Guitar',
  },
  {
    id: 5,
    name: 'Keyboard',
  },
  {
    id: 6,
    name: 'Vocal',
  },
  {
    id: 7,
    name: 'Others',
  },
];

export default positionOptions;
