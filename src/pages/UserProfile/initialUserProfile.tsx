import { UserProfileType } from '../../types/types';

export const vacantUserProfile: UserProfileType = {
  avatarUrl: '',
  name: '',
  birthday: '2000-01-01',
  gender: false,
  positions: [],
  areas: [],
  genres: [],
  description: '',
  userPerformances: [],
};

export const initialUserProfile = {
  avatarUrl: 'https://picsum.photos/200',
  name: '김형식',
  birthday: '1996-01-01',
  gender: false,
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
      musicTitle: '히미츠 - 신장개업',
      performDate: '2020-01-01',
      urls: [
        {
          siteName: '유튜브',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        {
          siteName: '사운드클라우드',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ],
    },
    {
      id: 2,
      musicTitle: '히미츠 - 화성침공',
      performDate: '2020-01-01',
      urls: [
        {
          siteName: '유튜브',
          url: 'https://www.google.com',
        },
        {
          siteName: '사운드클라우드',
          url: 'https://www.naver.com',
        },
      ],
    },
  ],
};
