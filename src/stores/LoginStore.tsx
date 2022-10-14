import create from 'zustand';
import AuthAPI from '../apis/AuthAPI';
import RecruitProcessAPI from '../apis/RecruitProcessAPI';

interface loginStoreType {
  userId: string; // 현재 로그인 아이디
  isLoggedIn: boolean; // 현재 로그인 여부
  notificationCount: number; // 알림 개수
  checkNotification: () => void; // 알림 확인
  logIn: (value: string) => void; // 로그인 시 상태 변경
  logOut: () => void; // 로그아웃 시 상태 변경
}

export const useLoginStore = create<loginStoreType>()((set) => ({
  userId: '',
  isLoggedIn: false,
  notificationCount: 0,
  checkNotification: () => {
    const token = sessionStorage.getItem('accessToken');
    const userID = sessionStorage.getItem('userID');

    if (token && userID) {
      RecruitProcessAPI.checkNotification()
        .then((res) => {
          console.log(res.data);
          if (sessionStorage.getItem('userID')) {
            set((state) => ({
              userId: userID,
              isLoggedIn: true,
              notificationCount: res.data.count,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  },
  logIn: (value: string) => {
    set((state) => ({ userId: value, isLoggedIn: true }));
  },
  logOut: () => {
    set((state) => ({ userId: '', isLoggedIn: false }));
  },
}));
