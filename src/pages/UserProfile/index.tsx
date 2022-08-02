import React, { useEffect, useState } from 'react';
import MyPageTemplate from '../../components/MyPageTemplate';
import ProfileReadOnlyTextField from '../../components/ProfileReadOnlyTextField';
import ProfileSelectField from '../../components/ProfileSelectField';
import AreaField from '../../components/AreaField';
import areaOptions from '../../assets/options/areaOptions';
import DescriptionField from '../../components/DescriptionField';
import {
  RecordLinkType,
  PerformanceRecordType,
  UserProfileType,
} from '../../types/types';

function RecordItem({ record }: { record: PerformanceRecordType }) {
  return (
    <div className='grid grid-auto-row bg-success'>
      <div>
        <span>{record.title}</span>
      </div>
    </div>
  );
}

function RecordField({ records }: { records: PerformanceRecordType[] }) {
  return (
    <div className='mt-6'>
      <h1 className='text-bold text-2xl font-bold h-12'>연주 목록</h1>
      <div className='mt-6'>
        {records.map((record) => (
          <RecordItem record={record} />
        ))}
      </div>
    </div>
  );
}

function UserProfile() {
  const [curUserProfile, setCurUserProfile] = useState<UserProfileType>({
    name: '김성현',
    birthday: '1996-01-01',
    positions: [{ id: 1, name: '일렉기타' }],
    areas: [{ id: 2, city: '서울', district: '중구' }],
    genres: [],
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
        title: '서울 비상사태 십 분 전',
        date: '2020-01-01',
        recordLinks: [
          {
            platform: '유튜브',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
        ],
      },
    ],
  });

  const positionOptions = ['일렉기타', '키보드', '보컬', '베이스기타', '드럼'];

  return (
    <div>
      <h1 className='text-bold text-2xl font-bold h-12'>내 정보</h1>
      <div className='mt-6 flex flex-col items-center'>
        <div className='avatar w-1/3'>
          <div className='rounded-full'>
            <img src='https://picsum.photos/200' alt='avatar' />
          </div>
        </div>
        <div className='w-full mt-10'>
          <ProfileReadOnlyTextField label='이름' value={curUserProfile.name} />
          <ProfileReadOnlyTextField
            label='나이'
            value={curUserProfile.birthday}
          />
          <ProfileSelectField
            label='포지션'
            name='position'
            selected={curUserProfile.positions}
            options={positionOptions}
            setSelected={(newPosition) => {
              setCurUserProfile({
                ...curUserProfile,
                positions: newPosition,
              });
            }}
          />
          <AreaField
            label='지역'
            areas={curUserProfile.areas}
            setAreas={(newAreas) => {
              setCurUserProfile({
                ...curUserProfile,
                areas: newAreas,
              });
            }}
            options={areaOptions}
          />
          <DescriptionField
            label='자기소개'
            description={curUserProfile.description}
            setDescription={(newDescription) => {
              setCurUserProfile({
                ...curUserProfile,
                description: newDescription,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

function UserProfilePage() {
  return (
    <MyPageTemplate>
      <UserProfile />
    </MyPageTemplate>
  );
}

export default UserProfilePage;
