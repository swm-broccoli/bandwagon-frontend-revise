// 마이 페이지, 계정 정보 수정 관련 API
import { AxiosResponse } from 'axios';
import { request } from './request';

interface UserProfileApiType {
  getUserProfileInfo: () => Promise<AxiosResponse>;
}

const UserProfileAPI: UserProfileApiType = {
  getUserProfileInfo: () => {
    const userID = localStorage.getItem('userID');
    return request.get(`/api/users/${userID}/mypage`);
  },
};

export default UserProfileAPI;
