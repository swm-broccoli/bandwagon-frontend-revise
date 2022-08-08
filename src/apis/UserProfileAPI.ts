// 마이 페이지, 계정 정보 수정 관련 API
import { AxiosResponse } from 'axios';
import { request } from './request';

interface UserProfileApiType {
  getUserProfileInfo: () => Promise<AxiosResponse>;
  updateUserAvatar: (avatar: string) => Promise<AxiosResponse>;
  addUserPosition: (positionID: number) => Promise<AxiosResponse>;
  deleteUserPosition: (positionID: number) => Promise<AxiosResponse>;
  addUserGenre: (genreID: number) => Promise<AxiosResponse>;
  deleteUserGenre: (genreID: number) => Promise<AxiosResponse>;
  addUserArea: (areaID: number) => Promise<AxiosResponse>;
  deleteUserArea: (areaID: number) => Promise<AxiosResponse>;
  setUserDescription: (description: string) => Promise<AxiosResponse>;
}

const UserProfileAPI: UserProfileApiType = {
  getUserProfileInfo: () => {
    const userID = localStorage.getItem('userID');
    return request.get(`/api/users/${userID}/mypage`);
  },
  updateUserAvatar: (avatar: string) => {
    const userID = localStorage.getItem('userID');
    return request.put(`/api/users/${userID}/avatar`, { image: avatar });
  },
  addUserPosition: (positionID) => {
    const userID = localStorage.getItem('userID');
    return request.post(`/api/users/${userID}/positions/${positionID}`);
  },
  deleteUserPosition: (positionID) => {
    const userID = localStorage.getItem('userID');
    return request.delete(`/api/users/${userID}/positions/${positionID}`);
  },
  addUserGenre: (genreID) => {
    const userID = localStorage.getItem('userID');
    return request.post(`/api/users/${userID}/genres/${genreID}`, genreID);
  },
  deleteUserGenre: (genreID) => {
    const userID = localStorage.getItem('userID');
    return request.delete(`/api/users/${userID}/genres/${genreID}`);
  },
  addUserArea: (areaID) => {
    const userID = localStorage.getItem('userID');
    return request.post(`/api/users/${userID}/areas/${areaID}`);
  },
  deleteUserArea: (areaID) => {
    const userID = localStorage.getItem('userID');
    return request.delete(`/api/users/${userID}/areas/${areaID}`);
  },
  setUserDescription: (description) => {
    const userID = localStorage.getItem('userID');
    return request.put(`/api/users/${userID}/description`, {
      description: description,
    });
  },
};

export default UserProfileAPI;
