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
    newPerformance: AddPerformanceType,
  ) => Promise<AxiosResponse>;
  deleteUserPerformance: (performanceID: number) => Promise<AxiosResponse>;
  updateUserPerformance: (
    updatedPerformance: PerformanceRecordType,
  ) => Promise<AxiosResponse>;
}

const UserProfileAPI: UserProfileApiType = {
  getUserProfileInfo: () => {
    const userID = sessionStorage.getItem('userID');
    return request.get(`/api/users/${userID}/mypage`, {
      validateStatus: () => true,
    });
  },
  updateUserAvatar: (avatar: File) => {
    const userID = sessionStorage.getItem('userID');
    const formData = new FormData();
    formData.append('image', avatar);
    console.log(formData);
    return request.post(`/api/users/${userID}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  addUserPosition: (positionID) => {
    console.log(positionID, '포지션 추가됨');
    const userID = sessionStorage.getItem('userID');
    return request.post(`/api/users/${userID}/positions/${positionID}`);
  },
  deleteUserPosition: (positionID) => {
    console.log(`${positionID} 삭제중`);
    const userID = sessionStorage.getItem('userID');
    return request.delete(`/api/users/${userID}/positions/${positionID}`);
  },
  addUserGenre: (genreID) => {
    const userID = sessionStorage.getItem('userID');
    return request.post(`/api/users/${userID}/genres/${genreID}`, genreID);
  },
  deleteUserGenre: (genreID) => {
    const userID = sessionStorage.getItem('userID');
    return request.delete(`/api/users/${userID}/genres/${genreID}`);
  },
  addUserArea: (areaID) => {
    const userID = sessionStorage.getItem('userID');
    return request.post(`/api/users/${userID}/areas/${areaID}`);
  },
  deleteUserArea: (areaID) => {
    const userID = sessionStorage.getItem('userID');
    return request.delete(`/api/users/${userID}/areas/${areaID}`);
  },
  setUserDescription: (description) => {
    const userID = sessionStorage.getItem('userID');
    return request.put(`/api/users/${userID}/description`, {
      description: description,
    });
  },
  addUserPerformance: (newPerformance) => {
    const userID = sessionStorage.getItem('userID');
    return request.post(`/api/users/${userID}/performance`, newPerformance);
  },
  deleteUserPerformance: (performanceID) => {
    const userID = sessionStorage.getItem('userID');
    return request.delete(`/api/users/${userID}/performance/${performanceID}`);
  },
  updateUserPerformance: (updatedPerformance) => {
    const userID = sessionStorage.getItem('userID');
    return request.put(
      `/api/users/${userID}/performance/${updatedPerformance.id}`,
      {
        musicTitle: updatedPerformance.musicTitle,
        performDate: updatedPerformance.performDate,
        urls: updatedPerformance.urls,
      },
    );
  },
};

export default UserProfileAPI;
