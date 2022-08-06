import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyPageTemplate from '../../components/MyPageTemplate';
import ProfileReadOnlyTextField from '../../components/ProfileReadOnlyTextField';
import ProfileSelectField from '../../components/ProfileSelectField';
import AreaField from '../../components/AreaField';
import areaOptions from '../../assets/options/areaOptions';
import positionOptions from '../../assets/options/positionOptions';
import genreOptions from '../../assets/options/genreOptions';
import DescriptionField from '../../components/DescriptionField';
import {
  PerformanceRecordType,
  UserProfileType,
  UserProfileChangeTraceType,
} from '../../types/types';
import RecordField from '../../components/RecordField';
import UserProfileAPI from '../../apis/UserProfileAPI';
import initialUserProfile from './initialUserProfile';

function parsrUserProfile(userProfile: UserProfileType) {
  return {
    ...userProfile,
    birthday: userProfile.birthday.split('T')[0],
    description: userProfile.description || '타입 추론을 잘하는 김형식입니다.',
  };
}

function UserProfile() {
  const [curUserProfile, setCurUserProfile] =
    useState<UserProfileType>(initialUserProfile);

  const [profileEditing, setProfileEditing] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    UserProfileAPI.getUserProfileInfo()
      .then((res) => {
        console.log(res.data);
        setCurUserProfile(parsrUserProfile(res.data));
      })
      .catch((err) => {
        console.log('에러 발생', err);
        navigate('/');
      });
  }, []);

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
            <img src={curUserProfile.avatarUrl} alt='avatar' />
          </div>
        </div>
        <div className='w-full mt-10'>
          <ProfileReadOnlyTextField
            label='이름'
            value={curUserProfile.name}
            editing={profileEditing}
          />
          <ProfileReadOnlyTextField
            label='생년월일'
            value={curUserProfile.birthday}
            editing={profileEditing}
          />
          <ProfileReadOnlyTextField
            label='성별'
            value={curUserProfile.gender ? '여자' : '남자'}
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
            editing={profileEditing}
          />
          <ProfileSelectField
            label='장르'
            selected={curUserProfile.genres}
            setSelected={(newGenres) => {
              setCurUserProfile({
                ...curUserProfile,
                genres: newGenres,
              });
            }}
            options={genreOptions}
            editing={profileEditing}
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
            editing={profileEditing}
          />
          <RecordField
            label='연주 기록'
            records={curUserProfile.userPerformances}
            setRecords={(newRecords) => {
              setCurUserProfile({
                ...curUserProfile,
                userPerformances: newRecords,
              });
            }}
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
