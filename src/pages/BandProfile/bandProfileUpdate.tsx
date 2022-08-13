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

function updateBandProfile(
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

  /*const bandAreaDeletePromises: Promise<AxiosResponse>[] = serverBandAreas.map(
    (area) => {
      return BandProfileAPI.deleteBandArea(bandID, area.id);
    },
  );

  const bandAreaAddPromises: Promise<AxiosResponse>[] = curBandAreas.map(
    (area) => {
      return BandProfileAPI.addBandArea(bandID, area.id);
    },
  );*/

  console.log(serverBandAreas, '에서 ', curBandAreas);

  Promise.all(
    serverBandAreas.map((area) => {
      return BandProfileAPI.deleteBandArea(bandID, area.id);
    }),
  )
    .then((responses) => {
      console.log(responses, '서버에 저장되어 있던 밴드 지역들 삭제 성공');
      Promise.all(
        curBandAreas.map((area) => {
          return BandProfileAPI.addBandArea(bandID, area.id);
        }),
      )
        .then((responses) => {
          console.log(responses, '유저 수정 내역에 있는 밴드 지역들 추가 성공');
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updateBandDays(
  bandID: number,
  curBandDays: SelectionType[],
  serverBandDays: SelectionType[],
) {
  // 밴드 활동 요일을 서버와 동기화
  const ServerBandDayDeletePromises = serverBandDays.map((day) => {
    return BandProfileAPI.deleteBandDay(bandID, day.id);
  });

  const CurBandDayAddPromises = curBandDays.map((day) => {
    return BandProfileAPI.addBandDay(bandID, day.id);
  });

  await Promise.all(ServerBandDayDeletePromises)
    .then((responses) => {
      console.log(responses, '서버에 저장되어 있던 밴드 요일들 삭제 성공');
    })
    .catch((err) => {
      console.log(err);
    });

  await Promise.all(CurBandDayAddPromises)
    .then((responses) => {
      console.log(responses, '유저 수정 내역에 있던 밴드 요일들 추가 성공');
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updateBandGenres(
  bandID: number,
  curBandGenres: SelectionType[],
  serverBandGenres: SelectionType[],
) {
  const serverBandGenreDeletePromises = serverBandGenres.map((genre) => {
    return BandProfileAPI.deleteBandGenre(bandID, genre.id);
  });

  const curBandGenreAddPromises = curBandGenres.map((genre) => {
    return BandProfileAPI.addBandGenre(bandID, genre.id);
  });

  await Promise.all(serverBandGenreDeletePromises)
    .then((responses) => {
      console.log(responses, '서버에 저장되어 있던 밴드 장르들 삭제 성공');
    })
    .catch((err) => {
      console.log(err);
    });

  await Promise.all(curBandGenreAddPromises)
    .then((responses) => {
      console.log(responses, '유저 수정 내역에 있던 밴드 장르들 추가 성공');
    })
    .catch((err) => {
      console.log(err);
    });
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
  //공연 기록 관련 업데이트
  /*for (const gig of serverBandGigs) {
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
  }*/
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
