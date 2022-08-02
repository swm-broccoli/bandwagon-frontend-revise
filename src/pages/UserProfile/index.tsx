import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyPageTemplate from '../../components/MyPageTemplate';
import ProfileReadOnlyTextField from '../../components/ProfileReadOnlyTextField';
import ProfileSelectField from '../../components/ProfileSelectField';
import AreaField from '../../components/AreaField';
import areaOptions from '../../assets/options/areaOptions';
import positionOptions from '../../assets/options/positionOptions';
import DescriptionField from '../../components/DescriptionField';
import {
  RecordLinkType,
  PerformanceRecordType,
  UserProfileType,
} from '../../types/types';

function RecordLinkItem({ recordLink }: { recordLink: RecordLinkType }) {
  return (
    <div className='flex flex-row text-xs m-1'>
      <div className='w-24'>{recordLink.platform}</div>
      <div className='divider divider-horizontal m-0' />
      <a
        href={recordLink.url}
        className='link link-hover block w-full break-all'
      >
        {recordLink.url}
      </a>
    </div>
  );
}

function RecordItem({ record }: { record: PerformanceRecordType }) {
  const [editing, setEditing] = useState(false);

  return (
    <div className='grid grid-flow-row bg-success mt-2 px-4 py-2 rounded-lg'>
      <div className='grid grid-cols-2'>
        <span className='text-accent col-start-1'>{record.title}</span>
        <span className='text-neutral col-start-1 text-sm'>{record.date}</span>
        <button
          className='btn btn-primary btn-sm w-20 justify-self-end row-start-1 row-end-3 col-start-2'
          onClick={() => setEditing(!editing)}
        >
          {editing ? '저장' : '수정'}
        </button>
      </div>
      {record.recordLinks.map((recordLink) => (
        <RecordLinkItem key={recordLink.id} recordLink={recordLink} />
      ))}
    </div>
  );
}

function RecordField({
  label,
  records,
}: {
  label: string;
  records: PerformanceRecordType[];
}) {
  return (
    <div className='mt-6'>
      <h1 className='text-sm mb-5'>{label}</h1>
      {records.map((record, index) => (
        <RecordItem key={index} record={record} />
      ))}
    </div>
  );
}

function UserProfile() {
  const [curUserProfile, setCurUserProfile] = useState<UserProfileType>({
    name: '김성현',
    birthday: '1996-01-01',
    positions: [{ id: 1, name: 'Electric Guitar' }],
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
        title: '히미츠 - 신장개업',
        date: '2020-01-01',
        recordLinks: [
          {
            platform: '유튜브',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
          {
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
            platform: '유튜브',
            url: 'https://www.google.com',
          },
          {
            platform: '사운드클라우드',
            url: 'https://www.naver.com',
          },
        ],
      },
    ],
  });

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
          <RecordField
            label='연주 목록'
            records={curUserProfile.userPerformances}
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
