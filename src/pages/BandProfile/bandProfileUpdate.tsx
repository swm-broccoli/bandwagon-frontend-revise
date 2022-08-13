import BandProfileAPI from '../../apis/BandProfileAPI';
import { AxiosResponse } from 'axios';
import {
  AreaType,
  PerformanceRecordType,
  PictureType,
  SelectionType,
  BandMemberType,
  BandProfileType,
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

export function updateBandProfile(
  curBandProfile: BandProfileType,
  serverBandProfile: BandProfileType,
) {
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

  updateBandPractices(
    curBandProfile.id,
    curBandProfile.bandPractices,
    serverBandProfile.bandPractices,
  );

  updateBandGigs(
    curBandProfile.id,
    curBandProfile.bandGigs,
    serverBandProfile.bandGigs,
  );
}

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
        console.log('프로필 사진 업로드 성공');
      })
      .catch((err) => {
        console.log('프로필 사진 업로드 실패', err);
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

export async function updateBandAreas(
  bandID: number,
  curBandAreas: AreaType[],
  serverBandAreas: AreaType[],
) {
  //활동 지역 전부 삭제 후 다시 추가. 삭제를 먼저 하므로 await 사용해 순서 보장
  try {
    await Promise.all(
      serverBandAreas.map((area) => {
        // deleteBandArea 가 리턴되는 순간 이미 axios 요청은 간다.
        return BandProfileAPI.deleteBandArea(bandID, area.id);
      }),
    );
    console.log('기존 지역 삭제 성공');
    await Promise.all(
      curBandAreas.map((area) => {
        return BandProfileAPI.addBandArea(bandID, area.id);
      }),
    );
    console.log('새로운 지역 추가 성공');
  } catch (err) {
    console.log('지역 업데이트 실패', err);
  }
}

export async function updateBandDays(
  bandID: number,
  curBandDays: SelectionType[],
  serverBandDays: SelectionType[],
) {
  // 밴드 활동 요일을 서버와 동기화
  try {
    await Promise.all(
      serverBandDays.map((day) => {
        return BandProfileAPI.deleteBandDay(bandID, day.id);
      }),
    );
    console.log('기존 요일 삭제 성공');
    await Promise.all(
      curBandDays.map((day) => {
        return BandProfileAPI.addBandDay(bandID, day.id);
      }),
    );
    console.log('새로운 요일 추가 성공');
  } catch (err) {
    console.log('활동 요일 업데이트 실패', err);
  }
}

export async function updateBandGenres(
  bandID: number,
  curBandGenres: SelectionType[],
  serverBandGenres: SelectionType[],
) {
  try {
    await Promise.all(
      serverBandGenres.map((genre) => {
        return BandProfileAPI.deleteBandGenre(bandID, genre.id);
      }),
    );
    console.log('기존 선호 장르 삭제 성공');
    await Promise.all(
      curBandGenres.map((genre) => {
        return BandProfileAPI.addBandGenre(bandID, genre.id);
      }),
    );
    console.log('새로운 선호 장르 추가 성공');
  } catch (err) {
    console.log('선호 장르 업데이트 실패', err);
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
  console.log(curBandPractices);
  //연습 기록 관련 업데이트
  for (const performance of curBandPractices) {
    // musicTitle이 널이면 삭제된 기록이다
    if (performance.musicTitle === null) {
      BandProfileAPI.deleteBandPractice(bandID, performance.id)
        .then(() => {
          console.log('연습 기록 삭제 성공 : ', performance.id);
        })
        .catch((err) => {
          console.log('연습 기록 삭제 실패', err);
        });
    }
    // id가 음수면 추가된 기록이다
    else if (performance.id < 0) {
      BandProfileAPI.addBandPractice(bandID, {
        musicTitle: performance.musicTitle,
        performDate: performance.performDate,
        urls: performance.urls,
      })
        .then(() => {
          console.log('연습 기록 추가 성공 : ', performance.id);
        })
        .catch((err) => {
          console.log('연습 기록 추가 실패', err);
        });
    }
    // 그 외에는 편집된 기록이다
    else {
      BandProfileAPI.updateBandPractice(bandID, performance)
        .then(() => {
          console.log('연습 기록 업데이트 성공 : ', performance.id);
        })
        .catch((err) => {
          console.log('연습 기록 업데이트 실패', err);
        });
    }
  }
}

export function updateBandGigs(
  bandID: number,
  curBandGigs: PerformanceRecordType[],
  serverBandGigs: PerformanceRecordType[],
) {
  console.log(curBandGigs);
  for (const gig of curBandGigs) {
    // musicTitle이 널이면 삭제된 기록이다
    if (gig.musicTitle === null) {
      BandProfileAPI.deleteBandGig(bandID, gig.id)
        .then(() => {
          console.log('공연 기록 삭제 성공 : ', gig.id);
        })
        .catch((err) => {
          console.log('공연 기록 삭제 실패', err);
        });
    }
    // id가 음수면 추가된 기록이다
    else if (gig.id < 0) {
      BandProfileAPI.addBandGig(bandID, {
        musicTitle: gig.musicTitle,
        performDate: gig.performDate,
        urls: gig.urls,
      })
        .then(() => {
          console.log('연습 기록 추가 성공 : ', gig.id);
        })
        .catch((err) => {
          console.log('연습 기록 추가 실패', err);
        });
    }
    // 그 외에는 편집된 기록이다
    else {
      BandProfileAPI.updateBandGig(bandID, gig)
        .then(() => {
          console.log('연습 기록 업데이트 성공 : ', gig.id);
        })
        .catch((err) => {
          console.log('연습 기록 업데이트 실패', err);
        });
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
    if (curUserID !== member.email) {
      addMemberPromises.push(
        BandProfileAPI.addBandMember(bandID, member.email),
      );
    }
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
}
