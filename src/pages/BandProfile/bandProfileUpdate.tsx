import BandProfileAPI from '../../apis/BandProfileAPI';
import { AxiosResponse } from 'axios';
import {
  AreaType,
  PerformanceRecordType,
  PictureType,
  SelectionType,
  BandMemberType,
} from '../../types/types';
import { v4 } from 'uuid';

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

export function updateBandPractices(
  bandID: number,
  curBandPractices: PerformanceRecordType[],
  serverBandPractices: PerformanceRecordType[],
) {
  //연습 기록 관련 업데이트
  for (const performance of serverBandPractices) {
    // 서버에 있지만 유저가 삭제한 연습 기록 서버에서도 지우기
    if (curBandPractices.find((p) => p.id === performance.id) === undefined) {
      BandProfileAPI.deleteBandPractice(bandID, performance.id)
        .then(() => {
          console.log(performance.musicTitle, '삭제 성공');
        })
        .catch((err) => {
          console.log(performance.musicTitle, '삭제 실패', err);
        });
    }
  }

  for (const performance of curBandPractices) {
    // 서버에는 없지만 사용자가 새로 추가한 연주 기록이 있으면 서버에 추가한다
    if (
      serverBandPractices.find((p) => p.id === performance.id) === undefined
    ) {
      BandProfileAPI.addBandPractice(bandID, {
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
      // 사용자가 수정중인 연주기록에도 있고 서버 기록에도 있으면 수정된 것이다(물론 같을 수도 있지만))
      BandProfileAPI.updateBandPractice(bandID, performance);
    }
  }
}

export function updateBandGigs(
  bandID: number,
  curBandGigs: PerformanceRecordType[],
  serverBandGigs: PerformanceRecordType[],
) {
  //공연 기록 관련 업데이트
  for (const gig of serverBandGigs) {
    // 서버에 있지만 유저가 삭제한 연습 기록 서버에서도 지우기
    if (curBandGigs.find((g) => g.id === gig.id) === undefined) {
      BandProfileAPI.deleteBandGig(bandID, gig.id)
        .then(() => {
          console.log(gig.musicTitle, '삭제 성공');
        })
        .catch((err) => {
          console.log(gig.musicTitle, '삭제 실패', err);
        });
    }
  }

  for (const gig of curBandGigs) {
    // 서버에는 없지만 사용자가 새로 추가한 연주 기록이 있으면 서버에 추가한다
    if (serverBandGigs.find((g) => g.id === gig.id) === undefined) {
      BandProfileAPI.addBandGig(bandID, {
        musicTitle: gig.musicTitle,
        performDate: gig.performDate,
        urls: gig.urls,
      })
        .then((res) => {
          console.log(res);
          console.log(gig.musicTitle, '추가 성공');
        })
        .catch((err) => {
          console.log(gig.musicTitle, '추가 실패', err);
        });
    } else {
      // 사용자가 수정중인 연주기록에도 있고 서버 기록에도 있으면 수정된 것이다(물론 같을 수도 있지만))
      BandProfileAPI.updateBandGig(bandID, gig);
    }
  }
}

export function updateBandAlbum(
  bandID: number,
  bandPhotos: PictureType[],
  deletedPhotoIDs: number[],
) {
  //앨범 업데이트
  for (const photo of bandPhotos) {
    if (photo.id < 0) {
      //기존 사진은 id가 양수이다. 따라서 id가 음수인 사진이 들어 있다면 그건 새로 삽입된 사진이다.
      let hash = v4();
      console.log(hash, '번 사진 추가');

      BandProfileAPI.addBandPhoto(
        bandID,
        dataURLtoFile(photo.name, `band-album${hash}.png`),
      );
    }
  }
  for (const id of deletedPhotoIDs) {
    console.log('삭제된 사진 id:', id);
    BandProfileAPI.deleteBandPhoto(bandID, id);
  }
}

export async function updateBandMembers(
  bandID: number,
  curBandMembers: BandMemberType[],
  serverBandMembers: BandMemberType[],
  deletedMemberIDs: number[],
) {
  // 서버의 멤버 목록을 다 삭제한 후에 사용자의 수정 내역을 보내줘야 하므로 Async 를 써준다
  let deleteMemberPromises: Promise<AxiosResponse>[] = [];
  const curUserID = localStorage.getItem('userID');
  serverBandMembers.forEach((member) => {
    // 서버에 저장되어 있는 기존의 밴드 멤버들을 모두 제거한다
    if (curUserID !== member.email) {
      deleteMemberPromises.push(
        BandProfileAPI.deleteBandMember(bandID, member.id),
      );
    }
  });

  // 서버에 있는 유저 목록을 다 날린다
  await Promise.all(deleteMemberPromises);

  let addMemberPromises: Promise<AxiosResponse>[] = [];

  curBandMembers.forEach((member) => {
    // 사용자가 추가한 멤버들을 모두 추가한다
    addMemberPromises.push(BandProfileAPI.addBandMember(bandID, member.email));
  });
  //새로운 멤버들을 이메일로 추가한다
  await Promise.all(addMemberPromises);

  let addMemberPositionsPromises: Promise<AxiosResponse>[] = [];

  curBandMembers.forEach((member) => {
    member.positions.forEach((position) => {
      // 사용자가 추가한 멤버들의 직책을 모두 추가한다
      addMemberPositionsPromises.push(
        BandProfileAPI.addBandMemberPosition(bandID, member.id, position.id),
      );
    });
  });
  // 각 멤버들의 포지션
  await Promise.all(addMemberPositionsPromises);

  for (const member of curBandMembers) {
    // 사용자가 수정중인 멤버 목록을 모두 추가한다

    if (member.id < 0) {
      // ID가 음수면 새로 추가된 멤버
      // 해당 멤버와 그 멤버의 포지션을 서버에 추가
      console.log(member, '를 멤버로 추가');
      BandProfileAPI.addBandMember(bandID, member.email);
      for (const position of member.positions) {
        BandProfileAPI.addBandMemberPosition(bandID, member.id, position.id);
      }
    }
  }
}
