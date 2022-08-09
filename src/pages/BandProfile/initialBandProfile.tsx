import { BandProfileType } from '../../types/types';

const initialBandProfile: BandProfileType = {
  id: 1,
  name: '브로콜리 소마저',
  avatarUrl: 'https://picsum.photos/200',
  bandMembers: [
    {
      id: 12,
      name: 'Test',
      positions: [
        {
          id: 1,
          name: 'Electric Guitar',
        },
      ],
    },
    {
      id: 15,
      name: 'Test3',
      positions: [
        {
          id: 2,
          name: 'Acoustic Guitar',
        },
        {
          id: 3,
          name: 'Drum',
        },
      ],
    },
  ],
  areas: [
    {
      id: 1,
      city: '서울시',
      district: '종로구',
    },
    {
      id: 2,
      city: '서울시',
      district: '중구',
    },
  ],
  genres: [
    {
      id: 1,
      name: 'Rock',
    },
    {
      id: 2,
      name: 'Metal',
    },
  ],
  days: [
    {
      id: 1,
      name: 'Mon',
    },
    {
      id: 3,
      name: 'Wed',
    },
  ],
  description:
    '코스타리카 따라주 커피는 참 많지만 그래도 내가 제일 좋아하는 건 믹스커피',
  bandGigs: [
    {
      id: 1,
      musicTitle: '술 한잔해요',
      performDate: '2019-12-03',
      urls: [
        {
          siteName: 'Youtube',
          url: 'www.asd.asd',
        },
        {
          siteName: 'Soundcloud',
          url: 'asdasdsad',
        },
      ],
    },
  ],
  bandPractices: [
    {
      id: 1,
      musicTitle: 'Gravity',
      performDate: '2020-03-03',
      urls: [
        {
          siteName: 'Youtube',
          url: 'www.asd.asd',
        },
        {
          siteName: 'Soundcloud',
          url: 'asdasdsad',
        },
      ],
    },
  ],
  bandPhotos: [
    {
      id: 2,
      name: 'https://picsum.photos/200',
    },
    {
      id: 3,
      name: 'https://picsum.photos/201',
    },
    {
      id: 4,
      name: 'https://picsum.photos/202',
    },
    {
      id: 5,
      name: 'https://picsum.photos/203',
    },
    {
      id: 6,
      name: 'https://picsum.photos/204',
    },
    {
      id: 7,
      name: 'https://picsum.photos/205',
    },
    {
      id: 8,
      name: 'https://picsum.photos/206',
    },
  ],
};

export default initialBandProfile;
