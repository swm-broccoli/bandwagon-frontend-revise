import UserProfileAPI from '../../apis/UserProfileAPI';
import { AreaType, SelectionType } from '../../types/types';

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

export function updateUserAvatar(
  curUserAvatarUrl: string,
  serverUserAvatarUrl: string,
) {
  if (curUserAvatarUrl !== serverUserAvatarUrl) {
    UserProfileAPI.updateUserAvatar(
      dataURLtoFile(curUserAvatarUrl, 'user-avatar.png'),
    )
      .then(() => {
        console.log('사용자 프로필 사진 업로드 성공');
      })
      .catch((err) => {
        console.log('사용자 프로필 사진 업로드 실패', err);
      });
  }
}

export function updateUserPositions(
  curUserPositions: SelectionType[],
  serverUserPositions: SelectionType[],
) {
  for (const position of serverUserPositions) {
    // 서버에는 있지만 사용자가 삭제한(즉 수정중인 상태에 없는) 포지션이 있으면 서버로 삭제 내역을 보냄
    if (curUserPositions.find((p) => p.id === position.id) === undefined) {
      UserProfileAPI.deleteUserPosition(position.id)
        .then(() => {
          console.log(position.name, '삭제 성공');
        })
        .catch((err) => {
          console.log(position.name, '삭제 실패', err);
        });
    }
  }

  for (const position of curUserPositions) {
    // 서버에 없지만 사용자가 편집한 프로필에서 새로 추가한 포지션이 있으면 서버로 보낸다
    if (serverUserPositions.find((p) => p.id === position.id) === undefined) {
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
}

export function updateUserAreas(
  curUserAreas: AreaType[],
  serverUserAreas: AreaType[],
) {
  for (const area of serverUserAreas) {
    // 서버에는 있지만 사용자가 삭제한 장소가 있으면 서버로 삭제 내역을 보냄
    if (curUserAreas.find((a) => a.id === area.id) === undefined) {
      UserProfileAPI.deleteUserArea(area.id)
        .then(() => {
          console.log(`${area.city} ${area.district} 삭제 성공`);
        })
        .catch((err) => {
          console.log('삭제 실패', err);
        });
    }
  }

  for (const area of curUserAreas) {
    // 서버에 없지만 사용자가 편집한 프로필에서 새로 추가한 장소가 있으면 서버로 보낸다
    if (serverUserAreas.find((a) => a.id === area.id) === undefined) {
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
}

export function updateUserGenres(
  curUserGenres: SelectionType[],
  serverUserGenres: SelectionType[],
) {
  for (const genre of serverUserGenres) {
    // 서버에는 있지만 사용자가 삭제한 장르가 있으면 서버로 삭제 내역을 보냄
    if (curUserGenres.find((g) => g.id === genre.id) === undefined) {
      UserProfileAPI.deleteUserGenre(genre.id)
        .then(() => {
          console.log(genre.name, '삭제 성공');
        })
        .catch((err) => {
          console.log(genre.name, '삭제 실패', err);
        });
    }
  }

  for (const genre of curUserGenres) {
    // 서버에 없지만 사용자가 편집한 프로필에서 새로 추가한 장르가 있으면 서버로 보낸다
    if (serverUserGenres.find((g) => g.id === genre.id) === undefined) {
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
}
