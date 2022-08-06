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
  RecordLinkType,
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
