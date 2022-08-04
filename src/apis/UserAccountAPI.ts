import { AxiosResponse } from 'axios';
import { request } from './request';

interface UserAccountApiType {
  getUserAccountInfo: () => Promise<AxiosResponse>;
  updateUserAccountInfo: (newInfo: {
    name: string;
    nickname: string;
    gender: boolean;
    birthday: string;
  }) => Promise<AxiosResponse>;
}

const UserAccountAPI: UserAccountApiType = {
  getUserAccountInfo: () => {
    return request.get(`/api/users`);
  },
  updateUserAccountInfo: (newInfo) => {
    return request.put(`/api/users`, newInfo);
  },
};

export default UserAccountAPI;
