import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MyPageTemplate from '../../components/MyPageTemplate';
import ProfileReadOnlyTextField from '../../components/ProfileReadOnlyTextField';
import ProfileSelectField from '../../components/ProfileSelectField';
import AreaField from '../../components/AreaField';
import areaOptions from '../../assets/options/areaOptions';
import positionOptions from '../../assets/options/positionOptions';
import genreOptions from '../../assets/options/genreOptions';
import DescriptionField from '../../components/DescriptionField';
import { UserProfileType } from '../../types/types';
import RecordField from '../../components/RecordField';
import UserProfileAPI from '../../apis/UserProfileAPI';
import initialUserProfile from './initialUserProfile';
import { UserProfileAvatar } from './styles';

function parseUserProfile(userProfile: UserProfileType) {
  return {
    ...userProfile,
    description: userProfile.description || '타입 추론을 잘하는 김형식입니다.',
    userPerformances: userProfile.userPerformances.map((performance) => ({
      ...performance,
      performDate: performance.performDate.split('T')[0],
    })),
  };
}

const dataURLtoFile = (dataurl: string, fileName: string) => {
  //base64 문자열을 File 로 변경해 주는 함수
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)![1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};

function UserProfile() {
  const [curUserProfile, setCurUserProfile] =
    useState<UserProfileType>(initialUserProfile);

  const [serverUserProfile, setServerUserProfile] = useState<UserProfileType>({
    avatarUrl: '',
    name: '',
    birthday: '',
    gender: false,
    positions: [],
    genres: [],
    areas: [],
    description: '',
    userPerformances: [],
  });

  const [profileEditing, setProfileEditing] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    UserProfileAPI.getUserProfileInfo()
      .then((res) => {
        console.log('서버에서 도착한 데이터', res.data);
        setCurUserProfile(parseUserProfile(res.data));
        setServerUserProfile(parseUserProfile(res.data));
      })
      .catch((err) => {
        console.log('에러 발생', err);
        navigate('/');
      });
  }, []);

  const onProfileEditDone = () => {
    if (profileEditing) {
      //수정 완료 상태로 접어들었다
      if (curUserProfile.avatarUrl !== serverUserProfile.avatarUrl) {
        //사진이 바뀌었다면 서버에 업로드해야함
        UserProfileAPI.updateUserAvatar(
          dataURLtoFile(curUserProfile.avatarUrl, 'avatar.png'),
        )
          .then(() => {
            console.log('사진 업로드 성공');
          })
          .catch((err) => {
            console.log('사진 업로드 실패', err);
          })
          .finally(() => {
            setProfileEditing(false);
          });
      }

      for (const position of serverUserProfile.positions) {
        // 서버에는 있지만 사용자가 삭제한(즉 수정중인 상태에 없는) 포지션이 있으면 서버로 삭제 내역을 보냄
        if (
          curUserProfile.positions.find((p) => p.id === position.id) ===
          undefined
        ) {
          UserProfileAPI.deleteUserPosition(position.id)
            .then(() => {
              console.log(position.name, '삭제 성공');
            })
            .catch((err) => {
              console.log(position.name, '삭제 실패', err);
            });
        }
      }

      for (const position of curUserProfile.positions) {
        // 서버에 없지만 사용자가 편집한 프로필에서 새로 추가한 포지션이 있으면 서버로 보낸다
        if (
          serverUserProfile.positions.find((p) => p.id === position.id) ===
          undefined
        ) {
          UserProfileAPI.addUserPosition(position.id)
            .then((res) => {
              console.log(res);
              console.log(position.name, '추가 성공');
            })
            .catch((err) => {
              console.log(err);
              console.log(position.name, '추가 실패');
            });
        }
      }

      for (const area of serverUserProfile.areas) {
        // 서버에는 있지만 사용자가 삭제한 장소가 있으면 서버로 삭제 내역을 보냄
        if (curUserProfile.areas.find((a) => a.id === area.id) === undefined) {
          UserProfileAPI.deleteUserArea(area.id)
            .then(() => {
              console.log(`${area.city} ${area.district} 삭제 성공`);
            })
            .catch((err) => {
              console.log('삭제 실패', err);
            });
        }
      }

      for (const area of curUserProfile.areas) {
        // 서버에 없지만 사용자가 편집한 프로필에서 새로 추가한 장소가 있으면 서버로 보낸다
        if (
          serverUserProfile.areas.find((a) => a.id === area.id) === undefined
        ) {
          UserProfileAPI.addUserArea(area.id)
            .then((res) => {
              console.log(res);
              console.log(`${area.city} ${area.district} 추가 성공`);
            })
            .catch((err) => {
              console.log('추가 실패', err);
            });
        }
      }

      for (const genre of serverUserProfile.genres) {
        // 서버에는 있지만 사용자가 삭제한 장르가 있으면 서버로 삭제 내역을 보냄
        if (
          curUserProfile.genres.find((g) => g.id === genre.id) === undefined
        ) {
          UserProfileAPI.deleteUserGenre(genre.id)
            .then(() => {
              console.log(genre.name, '삭제 성공');
            })
            .catch((err) => {
              console.log(genre.name, '삭제 실패', err);
            });
        }
      }

      for (const genre of curUserProfile.genres) {
        // 서버에 없지만 사용자가 편집한 프로필에서 새로 추가한 장르가 있으면 서버로 보낸다
        if (
          serverUserProfile.genres.find((g) => g.id === genre.id) === undefined
        ) {
          UserProfileAPI.addUserGenre(genre.id)
            .then((res) => {
              console.log(res);
              console.log(genre.name, '추가 성공');
            })
            .catch((err) => {
              console.log(genre.name, '추가 실패', err);
            });
        }
      }

      if (serverUserProfile.description !== curUserProfile.description) {
        //자기소개가 다를 경우 서버로 전송
        console.log('서버에 저장할 내용이 있음.' + curUserProfile.description);
        UserProfileAPI.setUserDescription(curUserProfile.description)
          .then((res) => {
            console.log('서버에 저장 성공', res);
          })
          .catch((err) => {
            console.log('서버에 저장 실패', err);
          });
      }

      //연주 기록 관련 업데이트
      for (const performance of serverUserProfile.userPerformances) {
        if (
          curUserProfile.userPerformances.find(
            (p) => p.id === performance.id,
          ) === undefined
        ) {
          UserProfileAPI.deleteUserPerformance(performance.id)
            .then(() => {
              console.log(performance.musicTitle, '삭제 성공');
            })
            .catch((err) => {
              console.log(performance.musicTitle, '삭제 실패', err);
            });
        }
      }

      for (const performance of curUserProfile.userPerformances) {
        // 서버에는 없지만 사용자가 새로 추가한 연주 기록이 있으면 서버에 추가한다
        if (
          serverUserProfile.userPerformances.find(
            (p) => p.id === performance.id,
          ) === undefined
        ) {
          console.log(performance);
          UserProfileAPI.addUserPerformance({
            musicTitle: performance.musicTitle,
            performDate: performance.performDate,
            urls: performance.urls,
          })
            .then((res) => {
              console.log(res);
              console.log(performance.musicTitle, '추가 성공');
            })
            .catch((err) => {
              console.log(performance.musicTitle, '추가 실패', err);
            });
        } else {
          // 사용자가 수정중인 연주기록에도 있고 서버 기록에도 있으면 수정된 것이다
          UserProfileAPI.updateUserPerformance(performance);
        }
      }
    }
    setProfileEditing(!profileEditing);
  };

  return (
    <div>
      <div className='flex flex-row justify-between'>
        <h1 className='text-bold text-2xl font-bold'>내 정보</h1>
        <button
          className={`btn h-10 ${
            profileEditing ? 'bg-base-100 hover:bg-base-200' : 'btn-primary'
          }`}
          onClick={onProfileEditDone}
        >
          {profileEditing ? '수정 완료' : '수정하기'}
        </button>
      </div>
      <div className='mt-6 flex flex-col items-center'>
        <UserProfileAvatar
          avatarURL={curUserProfile.avatarUrl}
          setAvatarURL={(newAvatarURL) => {
            setCurUserProfile({ ...curUserProfile, avatarUrl: newAvatarURL });
          }}
          editing={profileEditing}
        />
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
