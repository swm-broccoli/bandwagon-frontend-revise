// 아이디, 비밀번호 찾기 관련 API
import axios, { AxiosResponse } from 'axios';

const { VITE_BASE_URL } = import.meta.env;

const baseURL =
  'http://bandwagon-vpc-alb-private-dev-830505980.ap-northeast-2.elb.amazonaws.com/';

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

/* 
! 아이디, 비밀번호 찾기는 로그인이 필요 없으므로 request 객체를 쓸 필요가 없다. 
*/
const FindAccountAPI: FindAccountApiType = {
  findEmail: (findEmailInfo) =>
    axios.post(VITE_BASE_URL + 'api/find/email', findEmailInfo),
  findPassword: (findPasswordInfo) =>
    axios.post(VITE_BASE_URL + 'api/find/password', findPasswordInfo),
};

export default FindAccountAPI;
