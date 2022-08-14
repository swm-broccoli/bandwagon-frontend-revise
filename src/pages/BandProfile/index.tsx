import { useEffect, useState } from 'react';
import MyPageTemplate from '../../components/MyPageTemplate';
import ProfileSelectField from '../../components/ProfileSelectField';
import AreaField from '../../components/AreaField';
import {
  BandProfileAvatar,
  BandMemberList,
  BandProfileAlbum,
  ProfileTextField,
} from './styles';
import { BandProfileType } from '../../types/types';
import areaOptions from '../../assets/options/areaOptions';
import weekdayOptions from '../../assets/options/weekdayOptions';
import genreOptions from '../../assets/options/genreOptions';
import DescriptionField from '../../components/DescriptionField';
import RecordField from '../../components/RecordField';
import BandProfileAPI from '../../apis/BandProfileAPI';
import noBandPicture from '../../assets/noband.png';
import { updateBandProfile } from './bandProfileUpdate';
import EmptyBandProfile from './EmptyBandProfile';
import { vacantBandProfile } from './initialBandProfile';

function parseBandProfile(bandProfile: BandProfileType) {
  return {
    ...bandProfile,
    description: bandProfile.description || '',
  };
}

function BandProfile() {
  const [profileEditing, setProfileEditing] = useState<boolean>(false);

  const [curBandProfile, setCurBandProfile] =
    useState<BandProfileType>(vacantBandProfile);

  const [serverBandProfile, setServerBandProfile] =
    useState<BandProfileType>(vacantBandProfile);

  useEffect(() => {
    BandProfileAPI.getBandProfileInfo()
      .then((res) => {
        if (res.status === 200) {
          // 제대로 응답을 받았을 경우에는 응답으로 온 프로필을 밴드 프로필로
          console.log(res.data);
          setCurBandProfile(parseBandProfile(res.data));
          setServerBandProfile(parseBandProfile(res.data));
        }
        //아닌 경우 밴드가 없거나 뭔가 오류가 발생했다는 뜻이므로 빈 프로필을 보여준다
      })
      .catch((err) => {
        console.log(err);
      });
  }, [profileEditing]);

  const onBandProfileEditDone = () => {
    if (profileEditing) {
      console.log('수정 완료 동작');

      updateBandProfile(curBandProfile, serverBandProfile);
    }
    //서버에 있는 상태를 현재 유저의 편집 상태로 동기화했다.
    setServerBandProfile(curBandProfile);
    // 유저가 삭제한 상태를 모두 반영했으므로 삭제한 아이디를 초기화한다.
    setProfileEditing(!profileEditing);
  };

  // 정보를 못 받아왔다면 id가 -1인 상태이다
  if (curBandProfile.id === -1) {
    return <EmptyBandProfile emptyBandPicture={noBandPicture} />;
  } else {
    return (
      <div>
        <div className='flex flex-row justify-between'>
          <h1 className='text-bold text-2xl font-bold'>밴드 정보</h1>
          <button
            className={`btn h-10 ${
              profileEditing ? 'bg-base-100 hover:bg-base-200' : 'btn-primary'
            }`}
            onClick={onBandProfileEditDone}
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
            <ProfileTextField
              label='밴드명'
              value={curBandProfile.name}
              setValue={(newName) => {
                setCurBandProfile({
                  ...curBandProfile,
                  name: newName,
                });
              }}
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
              frontmanReading={curBandProfile.isReaderFrontman}
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
              setBandPhotos={(newBandPhotos) => {
                setCurBandProfile({
                  ...curBandProfile,
                  bandPhotos: newBandPhotos,
                });
              }}
              editing={profileEditing}
            />
            <RecordField
              label='연습 기록'
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
}

function BandProfilePage() {
  return (
    <MyPageTemplate>
      <BandProfile />
    </MyPageTemplate>
  );
}

export default BandProfilePage;
