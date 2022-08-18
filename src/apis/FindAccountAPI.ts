// 아이디, 비밀번호 찾기 관련 API
import { AxiosResponse } from 'axios';
import { request } from './request';

interface FindAccountApiType {
  findEmail: (findEmailInfo: {
    name: string;
    birthday: string;
  }) => Promise<AxiosResponse>;
  findPassword: (findPasswordInfo: {
    name: string;
    email: string;
  }) => Promise<AxiosResponse>;
}

const FindAccountAPI: FindAccountApiType = {
  findEmail: (findEmailInfo) => request.post('api/find/email', findEmailInfo),
  findPassword: (findPasswordInfo) =>
    request.post('api/find/password', findPasswordInfo),
};

export default FindAccountAPI;
