import create from 'zustand';
import AuthAPI from '../apis/AuthAPI';

interface loginStoreType {
  userId: string; // 현재 로그인 아이디
  isLoggedIn: boolean; // 현재 로그인 여부
  checkLoggedIn: () => void; // 로그인 여부 확인
  logIn: (value: string) => void; // 로그인 시 상태 변경
  logOut: () => void; // 로그아웃 시 상태 변경
}

export const useLoginStore = create<loginStoreType>()((set) => ({
  userId: '',
  isLoggedIn: false,
  checkLoggedIn: () => {
    const token = localStorage.getItem('accessToken');
    const userID = localStorage.getItem('userID');

    if (token && userID) {
      AuthAPI.checkToken()
      .then((res) => {
        console.log(res);
        if (localStorage.getItem('userID')) {
          set((state) => ({ userId: userID, isLoggedIn: true }));
        }
      })
      .catch((err) => {
        console.log(err);
      })
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
