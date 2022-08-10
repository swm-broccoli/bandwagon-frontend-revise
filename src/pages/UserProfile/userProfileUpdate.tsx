import UserProfileAPI from '../../apis/UserProfileAPI';

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
