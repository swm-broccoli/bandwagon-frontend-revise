// 로그인, 회원가입, 비밀번호 변경 관련 API
import { AxiosResponse } from 'axios';
import { useLoginStore } from '../stores/LoginStore';
import { request } from './request';

interface AuthApiType {
  signIn: (userInfo: {
    email: string;
    password: string;
  }) => Promise<AxiosResponse>;
  logOut: () => void;
  signUp: (userInfo: {
    name: string;
    nickname: string;
    email: string;
    password: string;
    passwordCheck: string;
    gender: boolean;
    birthday: string;
  }) => Promise<AxiosResponse>;
  checkEmail: (userInfo: { email: string }) => Promise<AxiosResponse>;
  checkToken: () => Promise<AxiosResponse>;
  loadUserInfo: () => Promise<AxiosResponse>;
}

const AuthAPI: AuthApiType = {
  signIn: (userInfo) => {
    return request.post('api/login', userInfo);
  },
  logOut: () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('isSocial');
    // window.location.href = '/login';
    useLoginStore.getState().logOut();
  },
  signUp: (userInfo) => request.post('api/signup', userInfo),
  checkEmail: (userInfo) => request.post('api/duplicate', userInfo),
  checkToken: () => request.get(''),
  loadUserInfo: () => request.get('api/users'),
};

export default AuthAPI;
