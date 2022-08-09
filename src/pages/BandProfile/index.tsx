import { useEffect, useState } from 'react';
import MyPageTemplate from '../../components/MyPageTemplate';
import ProfileSelectField from '../../components/ProfileSelectField';
import AreaField from '../../components/AreaField';
import initialBandProfile from './initialBandProfile';
import { BandProfileAvatar, BandMemberList } from './styles';
import { BandProfileType, PictureType } from '../../types/types';
import ProfileReadOnlyTextField from '../../components/ProfileReadOnlyTextField';
import areaOptions from '../../assets/options/areaOptions';
import weekdayOptions from '../../assets/options/weekdayOptions';
import genreOptions from '../../assets/options/genreOptions';
import DescriptionField from '../../components/DescriptionField';
import RecordField from '../../components/RecordField';

function BandProfileAlbum({
  label,
  bandPhotos,
  editing,
}: {
  label: string;
  bandPhotos: PictureType[];
  editing: boolean;
}) {
  return (
    <div className='w-full bg-success'>
      <div className='flex flex-row justify-between items-center h-8 mb-5'>
        <h1>{label}</h1>
        {editing ? (
          <button className='btn btn-primary btn-sm h-8 w-14 mr-1 p-0'>
            +추가
          </button>
        ) : null}
      </div>
      <div className='flex flex-row overflow-scroll'>
        {bandPhotos.map((photo) => (
          <img src={photo.name} alt='사잔' key={photo.id} />
        ))}
      </div>
      <div className='divider m-0 mt-5' />
    </div>
  );
}

function BandProfile() {
  const [profileEditing, setProfileEditing] = useState<boolean>(false);

  const [curBandProfile, setCurBandProfile] =
    useState<BandProfileType>(initialBandProfile);

  return (
    <div>
      <div className='flex flex-row justify-between'>
        <h1 className='text-bold text-2xl font-bold'>밴드 정보</h1>
        <button
          className={`btn h-10 ${
            profileEditing ? 'bg-base-100 hover:bg-base-200' : 'btn-primary'
          }`}
          onClick={() => {
            setProfileEditing(!profileEditing);
          }}
        >
          {profileEditing ? '수정 완료' : '수정하기'}
        </button>
      </div>
      <div className='mt-6 flex flex-col items-center'>
        <BandProfileAvatar
          avatarURL={curBandProfile.avatarUrl}
          setAvatarURL={(newAvatarUrl) => {
            setCurBandProfile({
              ...curBandProfile,
              avatarUrl: newAvatarUrl,
            });
          }}
          editing={profileEditing}
        />
        <div className='w-full mt-10'>
          <ProfileReadOnlyTextField
            label='밴드명'
            value={curBandProfile.name}
            editing={profileEditing}
          />
          <BandMemberList
            label='밴드 멤버'
            bandMembers={curBandProfile.bandMembers}
            setBandMembers={(newBandMembers) => {
              setCurBandProfile({
                ...curBandProfile,
                bandMembers: newBandMembers,
              });
            }}
            editing={profileEditing}
          />
          <AreaField
            label='활동 지역'
            areas={curBandProfile.areas}
            setAreas={(newAreas) => {
              setCurBandProfile({
                ...curBandProfile,
                areas: newAreas,
              });
            }}
            options={areaOptions}
            editing={profileEditing}
          />
          <ProfileSelectField
            label='활동 요일'
            selected={curBandProfile.days}
            setSelected={(newDays) => {
              setCurBandProfile({
                ...curBandProfile,
                days: newDays,
              });
            }}
            options={weekdayOptions}
            editing={profileEditing}
          />
          <ProfileSelectField
            label='선호 장르'
            selected={curBandProfile.genres}
            setSelected={(newGenres) => {
              setCurBandProfile({
                ...curBandProfile,
                genres: newGenres,
              });
            }}
            options={genreOptions}
            editing={profileEditing}
          />
          <DescriptionField
            label='밴드 소개'
            description={curBandProfile.description}
            setDescription={(newDescription) => {
              setCurBandProfile({
                ...curBandProfile,
                description: newDescription,
              });
            }}
            editing={profileEditing}
          />
          <BandProfileAlbum
            label='밴드 사진첩'
            bandPhotos={curBandProfile.bandPhotos}
            editing={profileEditing}
          />
          <RecordField
            label='연주 기록'
            records={curBandProfile.bandPractices}
            setRecords={(newRecords) => {
              setCurBandProfile({
                ...curBandProfile,
                bandPractices: newRecords,
              });
            }}
            editing={profileEditing}
          />
          <RecordField
            label='공연 기록'
            records={curBandProfile.bandGigs}
            setRecords={(newRecords) => {
              setCurBandProfile({
                ...curBandProfile,
                bandGigs: newRecords,
              });
            }}
            editing={profileEditing}
          />
        </div>
      </div>
    </div>
  );
}

function BandProfilePage() {
  return (
    <MyPageTemplate>
      <BandProfile />
    </MyPageTemplate>
  );
}

export default BandProfilePage;
