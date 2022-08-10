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
import initialBandProfile from './initialBandProfile';
import { BandProfileType, PictureType } from '../../types/types';
import areaOptions from '../../assets/options/areaOptions';
import weekdayOptions from '../../assets/options/weekdayOptions';
import genreOptions from '../../assets/options/genreOptions';
import DescriptionField from '../../components/DescriptionField';
import RecordField from '../../components/RecordField';
import BandProfileAPI from '../../apis/BandProfileAPI';
import noBandPicture from '../../assets/noband.png';
import {
  updateBandAreas,
  updateBandAvatarUrl,
  updateBandDays,
  updateBandName,
  updateBandGenres,
  updateBandDescription,
} from './bandProfileUpdate';

function parseBandProfile(bandProfile: BandProfileType) {
  return {
    ...bandProfile,
    description: bandProfile.description || '',
  };
}

function BandMakingForm() {
  const [bandName, setBandName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //폼은 제출시 자동 새로고침된다
    console.log(bandName, '밴드로 제출됨');
    BandProfileAPI.createBand(bandName)
      .then((res) => {
        if (res.status === 200) {
          setBandName('');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <label className='text-lg'>만들 밴드 이름</label>
      <input
        value={bandName}
        onChange={(e) => {
          setBandName(e.target.value);
        }}
        className='input input-bordered mt-3'
      />
      <button type='submit' className='btn btn-primary btn-sm h-10 mt-3'>
        만들기
      </button>
    </form>
  );
}

function EmptyBandProfile({ emptyBandPicture }: { emptyBandPicture: string }) {
  const [bandMaking, setBandMaking] = useState<boolean>(false);

  return (
    <section>
      <h1 className='text-bold text-2xl font-bold'>밴드 정보</h1>
      <div className='grid grid-flow-row justify-center'>
        <img src={emptyBandPicture} alt='밴드가 없을 때 사진' />
        가입한 밴드가 존재하지 않습니다!
        <button
          onClick={() => {
            setBandMaking((prev) => !prev);
          }}
          className='btn btn-sm bg-base-100 hover:bg-base-200 h-8 '
        >
          새 밴드 만들기
        </button>
        {bandMaking ? <BandMakingForm /> : null}
      </div>
    </section>
  );
}

function BandProfile() {
  const [profileEditing, setProfileEditing] = useState<boolean>(false);

  const [curBandProfile, setCurBandProfile] = useState<BandProfileType>({
    id: -1,
    avatarUrl: '',
    name: '',
    bandMembers: [],
    areas: [],
    genres: [],
    days: [],
    description: '',
    bandPractices: [],
    bandGigs: [],
    bandPhotos: [],
    isReaderFrontman: false,
  });

  const [serverBandProfile, setServerBandProfile] = useState<BandProfileType>({
    id: -1,
    avatarUrl: '',
    name: '',
    bandMembers: [],
    areas: [],
    genres: [],
    days: [],
    description: '',
    bandPractices: [],
    bandGigs: [],
    bandPhotos: [],
    isReaderFrontman: false,
  });

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
  }, []);

  const onBandProfileEditDone = () => {
    if (profileEditing) {
      console.log('수정 완료 동작');

      updateBandAvatarUrl(
        curBandProfile.id,
        curBandProfile.avatarUrl,
        serverBandProfile.avatarUrl,
      );

      updateBandName(
        curBandProfile.id,
        curBandProfile.name,
        serverBandProfile.name,
      );

      updateBandAreas(
        curBandProfile.id,
        curBandProfile.areas,
        serverBandProfile.areas,
      );

      updateBandDays(
        curBandProfile.id,
        curBandProfile.days,
        serverBandProfile.days,
      );

      updateBandGenres(
        curBandProfile.id,
        curBandProfile.genres,
        serverBandProfile.genres,
      );

      updateBandDescription(
        curBandProfile.id,
        curBandProfile.description,
        serverBandProfile.description,
      );
    }
    setProfileEditing(!profileEditing);
  };

  if (!curBandProfile) {
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
