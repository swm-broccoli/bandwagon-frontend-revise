import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyPageTemplate from '../../components/MyPageTemplate';
import ProfileReadOnlyTextField from '../../components/ProfileReadOnlyTextField';
import ProfileSelectField from '../../components/ProfileSelectField';
import AreaField from '../../components/AreaField';
import areaOptions from '../../assets/options/areaOptions';
import positionOptions from '../../assets/options/positionOptions';
import genreOptions from '../../assets/options/genreOptions';
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

  const {
    userProfile: storedUserProfile,
    setUserProfilePositions,
    setUserProfileAreas,
    setUserProfileGenres,
    setUserProfileDescription,
    setUserProfilePerformances,
  } = userProfileStore();

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

  useEffect(() => {
    setUserProfileItemChanged({
      ...userProfileItemChanged,
      positions: true,
    });
    console.log('포지션 변경됨');
  }, [storedUserProfile.positions]);

  useEffect(() => {
    setUserProfileItemChanged({
      ...userProfileItemChanged,
      areas: true,
    });
    console.log('활동 지역 변경됨');
  }, [storedUserProfile.areas]);

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
            selected={storedUserProfile.positions}
            setSelected={setUserProfilePositions}
            options={positionOptions}
            editing={profileEditing}
          />
          <AreaField
            label='활동지역'
            areas={storedUserProfile.areas}
            setAreas={setUserProfileAreas}
            options={areaOptions}
            editing={profileEditing}
          />
          <ProfileSelectField
            label='선호장르'
            selected={storedUserProfile.genres}
            setSelected={setUserProfileGenres}
            options={genreOptions}
            editing={profileEditing}
          />
          <DescriptionField
            label='자기소개'
            description={storedUserProfile.description}
            setDescription={setUserProfileDescription}
            editing={profileEditing}
          />
          <RecordField
            label='연주 목록'
            records={curUserProfile.userPerformances}
            setRecords={setUserProfilePerformances}
            editing={profileEditing}
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
