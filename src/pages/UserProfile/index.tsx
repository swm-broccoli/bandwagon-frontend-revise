import React, { useState } from 'react';
import MyPageTemplate from '../../components/MyPageTemplate';
import ProfileReadOnlyTextField from '../../components/ProfileReadOnlyTextField';
import ProfileSelectField from '../../components/ProfileSelectField';

function UserProfile() {
  const [curUserProfile, setCurUserProfile] = useState({
    name: '김성현',
    birthday: '1996-01-01',
    positions: ['일렉기타'],
    areas: [],
    genres: [],
    description: '',
    userPerformances: [],
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
