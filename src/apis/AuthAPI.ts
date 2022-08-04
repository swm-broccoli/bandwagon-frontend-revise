// 로그인, 회원가입, 비밀번호 변경 관련 API
import { AxiosResponse } from 'axios';
import { useLoginStore } from '../stores/LoginStore';
import { request } from './request';

interface AuthApiType {
  signIn: (userInfo: {
    email: string;
    password: string;
  }) => Promise<AxiosResponse>;
  signUp: (userInfo: {
    name: string;
    nickname: string;
    email: string;
    password: string;
    passwordCheck: string;
    gender: string;
    birthday: string;
  }) => Promise<AxiosResponse>;
  logOut: () => void;
}

const AuthAPI: AuthApiType = {
  signIn: (userInfo) => {
    console.log(userInfo);
    return request.post('api/login', userInfo);
  },
  signUp: (userInfo) => request.post('api/signup', userInfo),
  logOut: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userID');
    localStorage.removeItem('isSocial');
    window.location.href = '/login';
    useLoginStore.getState().logOut();
  },
};

export default AuthAPI;
