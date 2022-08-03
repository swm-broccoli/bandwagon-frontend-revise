const initialUserProfile = {
  name: '김성현',
  birthday: '1996-01-01',
  positions: [{ id: 1, name: 'Electric Guitar' }],
  areas: [{ id: 2, city: '서울', district: '중구' }],
  genres: [
    {
      id: 5,
      name: 'K-POP',
    },
  ],
  description: `서울 비상사태 십 분 전
  오늘 지구는 일촉즉발
  이런 막중한 임무가 하필 내게
  맡겨지게 된 건데
  길게 드리워진 그림자
  뭔지 알 수 없는 실루엣
  먼저 다가가기는 어렵겠어요
  다음에 와줄래요
  돌아가 줘요`,
  userPerformances: [
    {
      id: 1,
      title: '히미츠 - 신장개업',
      date: '2020-01-01',
      recordLinks: [
        {
          id: 1,
          platform: '유튜브',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        {
          id: 2,
          platform: '사운드클라우드',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ],
    },
    {
      id: 2,
      title: '히미츠 - 화성침공',
      date: '2020-01-01',
      recordLinks: [
        {
          id: 3,
          platform: '유튜브',
          url: 'https://www.google.com',
        },
        {
          id: 4,
          platform: '사운드클라우드',
          url: 'https://www.naver.com',
        },
      ],
    },
  ],
};

export default initialUserProfile;
