import BandProfileAPI from '../../apis/BandProfileAPI';
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

export function updateBandAvatarUrl(
  bandID: number,
  curBandAvatarUrl: string,
  serverBandAvatarUrl: string,
) {
  // 밴드 프로필 사진 수정
  if (curBandAvatarUrl !== serverBandAvatarUrl) {
    //사진이 바뀌었다면 서버에 업로드해야함
    BandProfileAPI.updateBandAvatar(
      bandID,
      dataURLtoFile(curBandAvatarUrl, 'band-avatar.png'),
    )
      .then(() => {
        console.log('사진 업로드 성공');
      })
      .catch((err) => {
        console.log('사진 업로드 실패', err);
      });
  }
}

export function updateBandName(
  bandID: number,
  curBandName: string,
  serverBandName: string,
) {
  if (curBandName !== serverBandName) {
    //사진이 바뀌었다면 서버에 업로드해야함
    BandProfileAPI.updateBandName(bandID, curBandName)
      .then(() => {
        console.log('밴드 이름 변경 성공');
      })
      .catch((err) => {
        console.log('밴드 이름 변경 실패', err);
      });
  }
}

// 밴드의 활동 지역을 서버와 동기화한다
export function updateBandAreas(
  bandID: number,
  curBandAreas: AreaType[],
  serverBandAreas: AreaType[],
) {
  // 현재 사용자가 편집한 밴드의 활동 지역과 서버에 저장된 내용을 비교해서 서버에 업로드해야함

  for (const area of serverBandAreas) {
    // 서버에는 있지만 사용자가 삭제한 장소가 있으면 서버로 삭제 내역을 보냄
    if (curBandAreas.find((a) => a.id === area.id) === undefined) {
      BandProfileAPI.deleteBandArea(bandID, area.id)
        .then(() => {
          console.log(`${area.city} ${area.district} 삭제 성공`);
        })
        .catch((err) => {
          console.log('삭제 실패', err);
        });
    }
  }

  for (const area of curBandAreas) {
    // 서버에 없지만 사용자가 편집한 프로필에서 새로 추가한 장소가 있으면 서버로 보낸다
    if (serverBandAreas.find((a) => a.id === area.id) === undefined) {
      BandProfileAPI.addBandArea(bandID, area.id)
        .then(() => {
          console.log(`${area.city} ${area.district} 추가 성공`);
        })
        .catch((err) => {
          console.log('추가 실패', err);
        });
    }
  }
}

export function updateBandDays(
  bandID: number,
  curBandDays: SelectionType[],
  serverBandDays: SelectionType[],
) {
  // 밴드 활동 요일을 서버와 동기화
  for (const day of serverBandDays) {
    // 서버에는 있지만 사용자가 삭제한 요일이 있으면 서버로 삭제 내역을 보냄
    if (curBandDays.find((d) => d.id === day.id) === undefined) {
      BandProfileAPI.deleteBandDay(bandID, day.id)
        .then(() => {
          console.log(`${JSON.stringify(day)} 삭제 성공`);
        })
        .catch((err) => {
          console.log('삭제 실패', err);
        });
    }
  }

  for (const day of curBandDays) {
    // 서버에 없지만 사용자가 편집한 프로필에서 새로 추가한 요일이 있으면 서버로 보낸다
    if (serverBandDays.find((d) => d.id === day.id) === undefined) {
      BandProfileAPI.addBandDay(bandID, day.id)
        .then((res) => {
          console.log(`${day.id} 추가 성공`);
        })
        .catch((err) => {
          console.log('추가 실패', err);
        });
    }
  }
}

export function updateBandGenres(
  bandID: number,
  curBandGenres: SelectionType[],
  serverBandGenres: SelectionType[],
) {
  // 밴드 활동 장르를 서버와 동기화
  for (const genre of serverBandGenres) {
    // 서버에는 있지만 사용자가 삭제한 장르가 있으면 서버로 삭제 내역을 보냄
    if (curBandGenres.find((g) => g.id === genre.id) === undefined) {
      BandProfileAPI.deleteBandGenre(bandID, genre.id)
        .then(() => {
          console.log(`${genre.name} 삭제 성공`);
        })
        .catch((err) => {
          console.log('삭제 실패', err);
        });
    }
  }

  for (const genre of curBandGenres) {
    // 서버에 없지만 사용자가 편집한 프로필에서 새로 추가한 장르가 있으면 서버로 보낸다
    if (serverBandGenres.find((g) => g.id === genre.id) === undefined) {
      BandProfileAPI.addBandGenre(bandID, genre.id)
        .then(() => {
          console.log(`${genre.name} 추가 성공`);
        })
        .catch((err) => {
          console.log('추가 실패', err);
        });
    }
  }
}

export function updateBandDescription(
  bandID: number,
  curBandDescription: string,
  serverBandDescription: string,
) {
  // 밴드 설명을 서버와 동기화
  if (curBandDescription !== serverBandDescription) {
    BandProfileAPI.updateBandDescription(bandID, curBandDescription)
      .then(() => {
        console.log('설명 업데이트 성공 : ', curBandDescription);
      })
      .catch((err) => {
        console.log('설명 업데이트 실패', err);
      });
  }
}
