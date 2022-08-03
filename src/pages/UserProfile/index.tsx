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
  UserProfileChangeTraceType,
} from '../../types/types';
import initialUserProfile from './initialUserProfile';
import userProfileStore from './userProfileStore';
import RecordField from '../../components/RecordField';

function UserProfile() {
  const [curUserProfile, setCurUserProfile] =
    useState<UserProfileType>(initialUserProfile);

  const [userProfileItemChanged, setUserProfileItemChanged] =
    useState<UserProfileChangeTraceType>({
      // 바뀐 내역을 추적하는 변수
      name: false,
      birthday: false,
      positions: false,
      areas: false,
      genres: false,
      description: false,
      userPerformances: false,
    });

  const [profileEditing, setProfileEditing] = useState<boolean>(false);

  return (
    <div>
      <div className='flex flex-row justify-between'>
        <h1 className='text-bold text-2xl font-bold'>내 정보</h1>
        <button
          className={`btn h-10 ${
            profileEditing ? 'bg-base-100 hover:bg-base-200' : 'btn-primary'
          }`}
          onClick={() => setProfileEditing(!profileEditing)}
        >
          {profileEditing ? '수정 완료' : '수정하기'}
        </button>
      </div>
      <div className='mt-6 flex flex-col items-center'>
        <div className='avatar w-1/3'>
          <div className='rounded-full'>
            <img src='https://picsum.photos/200' alt='avatar' />
          </div>
        </div>
        <div className='w-full mt-10'>
          <ProfileReadOnlyTextField
            label='이름'
            value={curUserProfile.name}
            editing={profileEditing}
          />
          <ProfileReadOnlyTextField
            label='나이'
            value={curUserProfile.birthday}
            editing={profileEditing}
          />
          <ProfileSelectField
            label='포지션'
            selected={curUserProfile.positions}
            setSelected={(newPositions) => {
              setCurUserProfile({
                ...curUserProfile,
                positions: newPositions,
              });
              setUserProfileItemChanged({
                ...userProfileItemChanged,
                positions: true,
              });
            }}
            options={positionOptions}
            editing={profileEditing}
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
