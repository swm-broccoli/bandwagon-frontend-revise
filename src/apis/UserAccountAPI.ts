import { AxiosResponse } from 'axios';
import { request } from './request';

interface UserAccountApiType {
  getUserAccountInfo: () => Promise<AxiosResponse>;
  updateUserAccountInfo: (newInfo: {
    name: string;
    nickname: string;
    gender: string;
    birthday: string;
  }) => Promise<AxiosResponse>;
  updateUserAccountPassword: (newPasswordInfo: {
    oldPassword: string;
    newPassword: string;
    newPasswordCheck: string;
  }) => Promise<AxiosResponse>;
  unregisterUserAccount: () => Promise<AxiosResponse>;
}

const UserAccountAPI: UserAccountApiType = {
  getUserAccountInfo: () => {
    return request.get(`/api/users`);
  },
  updateUserAccountInfo: (newInfo) => {
    return request.put(`/api/users`, newInfo);
  },
  updateUserAccountPassword: (newPasswordInfo) => {
    return request.put(`/api/users`, newPasswordInfo);
  },
  unregisterUserAccount: () => {
    return request.delete(`/api/unregister`);
  },
};

export default UserAccountAPI;
