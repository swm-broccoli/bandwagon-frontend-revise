// 마이 페이지, 계정 정보 수정 관련 API
import { AxiosResponse } from 'axios';
import { request } from './request';
import { PerformanceRecordType } from '../types/types';

export interface RecordURLType {
  siteName: string;
  url: string;
}

interface AddPerformanceType {
  musicTitle: string;
  performDate: string;
  urls: RecordURLType[];
}

interface UserProfileApiType {
  getUserProfileInfo: () => Promise<AxiosResponse>;
  updateUserAvatar: (avatar: File) => Promise<AxiosResponse>;
  addUserPosition: (positionID: number) => Promise<AxiosResponse>;
  deleteUserPosition: (positionID: number) => Promise<AxiosResponse>;
  addUserGenre: (genreID: number) => Promise<AxiosResponse>;
  deleteUserGenre: (genreID: number) => Promise<AxiosResponse>;
  addUserArea: (areaID: number) => Promise<AxiosResponse>;
  deleteUserArea: (areaID: number) => Promise<AxiosResponse>;
  setUserDescription: (description: string) => Promise<AxiosResponse>;
  addUserPerformance: (
    performance: AddPerformanceType,
  ) => Promise<AxiosResponse>;
  deleteUserPerformance: (performanceID: number) => Promise<AxiosResponse>;
  updateUserPerformance: (
    newPerformance: PerformanceRecordType,
  ) => Promise<AxiosResponse>;
}

const UserProfileAPI: UserProfileApiType = {
  getUserProfileInfo: () => {
    const userID = localStorage.getItem('userID');
    return request.get(`/api/users/${userID}/mypage`);
  },
  updateUserAvatar: (avatar: File) => {
    const userID = localStorage.getItem('userID');
    const formData = new FormData();
    formData.append('image', avatar);
    return request.post(`/api/users/${userID}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  addUserPosition: (positionID) => {
    console.log(positionID, '포지션 추가됨');
    const userID = localStorage.getItem('userID');
    return request.post(`/api/users/${userID}/positions/${positionID}`);
  },
  deleteUserPosition: (positionID) => {
    console.log(`${positionID} 삭제중`);
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
  addUserPerformance: (performance) => {
    const userID = localStorage.getItem('userID');
    return request.post(`/api/users/${userID}/performance`, {
      ...performance,
      urls: JSON.stringify(performance.urls),
    });
  },
  deleteUserPerformance: (performanceID) => {
    const userID = localStorage.getItem('userID');
    return request.delete(`/api/users/${userID}/performance/${performanceID}`);
  },
  updateUserPerformance: (newPerformance) => {
    const userID = localStorage.getItem('userID');
    return request.put(
      `/api/users/${userID}/performance/${newPerformance.id}`,
      {
        ...newPerformance,
        urls: JSON.stringify(newPerformance.urls),
      },
    );
  },
};

export default UserProfileAPI;
