import { AxiosResponse } from 'axios';
import { request } from './request';
import {
  BandMemberType,
  PerformanceRecordType,
  RecordURLType,
} from '../types/types';

interface AddPerformanceType {
  musicTitle: string;
  performDate: string;
  urls: RecordURLType[];
}

interface BandProfileApiType {
  createBand: (bandName: string) => Promise<AxiosResponse<any>>;
  getBandProfileInfo: () => Promise<AxiosResponse>;
  updateBandAvatar: (bandID: number, newAvatar: File) => Promise<AxiosResponse>;
  updateBandName: (bandID: number, newName: string) => Promise<AxiosResponse>;
  getNewMemberInfo: (newMemberEmail: string) => Promise<AxiosResponse>;
  addBandMember: (
    bandID: number,
    newMemberEmail: string,
  ) => Promise<AxiosResponse>;
  deleteBandMember: (
    bandID: number,
    memberID: number,
  ) => Promise<AxiosResponse>;
  addBandMemberPosition: (
    bandID: number,
    memberID: number,
    positionID: number,
  ) => Promise<AxiosResponse>;
  deleteBandMemberPosition: (
    bandID: number,
    memberID: number,
    positionID: number,
  ) => Promise<AxiosResponse>;
  addBandArea: (bandID: number, areaID: number) => Promise<AxiosResponse>;
  deleteBandArea: (bandID: number, areaID: number) => Promise<AxiosResponse>;
  addBandDay: (bandID: number, dayID: number) => Promise<AxiosResponse>;
  deleteBandDay: (bandID: number, dayID: number) => Promise<AxiosResponse>;
  addBandGenre: (bandID: number, genreID: number) => Promise<AxiosResponse>;
  deleteBandGenre: (bandID: number, genreID: number) => Promise<AxiosResponse>;
  updateBandDescription: (
    bandID: number,
    newDescription: string,
  ) => Promise<AxiosResponse>;
  addBandPractice: (
    bandID: number,
    newPractice: AddPerformanceType,
  ) => Promise<AxiosResponse>;
  deleteBandPractice: (
    bandID: number,
    practiceID: number,
  ) => Promise<AxiosResponse>;
  updateBandPractice: (
    bandID: number,
    updatedPractice: PerformanceRecordType,
  ) => Promise<AxiosResponse>;
  addBandGig: (
    bandID: number,
    newGig: AddPerformanceType,
  ) => Promise<AxiosResponse>;
  deleteBandGig: (bandID: number, gigID: number) => Promise<AxiosResponse>;
  updateBandGig: (
    bandID: number,
    updatedGig: PerformanceRecordType,
  ) => Promise<AxiosResponse>;
  addBandPhoto: (bandID: number, newPhoto: File) => Promise<AxiosResponse>;
  deleteBandPhoto: (bandID: number, photoID: number) => Promise<AxiosResponse>;
}

const BandProfileAPI: BandProfileApiType = {
  createBand: (bandName: string) => {
    return request.post('/api/band/create', {
      name: bandName,
    });
  },
  getBandProfileInfo: () => {
    // status 검증을 안 하고 무조건 통과시킨다. 따라서 404 Response 에러도 그대로 돌아온다.
    return request.get(`/api/band`, { validateStatus: () => true });
  },
  updateBandAvatar: (bandID: number, newAvatar: File) => {
    const formData = new FormData();
    formData.append('image', newAvatar);
    return request.post(`/api/band/${bandID}/avatar`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateBandName: (bandID: number, newName: string) => {
    return request.post(`/api/band/${bandID}/name`, {
      name: newName,
    });
  },
  getNewMemberInfo: (newMemberEmail: string) => {
    return request.get(`/api/users/${newMemberEmail}/mypage`);
  },
  addBandMember: (bandID: number, newMemberEmail: string) => {
    return request.post(`/api/band/${bandID}/member`, {
      email: newMemberEmail,
    });
  },
  deleteBandMember: (bandID: number, memberID: number) => {
    return request.delete(`/api/band/${bandID}/member/${memberID}`);
  },
  addBandMemberPosition: (
    bandID: number,
    memberID: number,
    positionID: number,
  ) => {
    console.log('포지션 추가 성공 ');
    return request.post(
      `/api/band/${bandID}/member/${memberID}/positions/${positionID}`,
    );
  },
  deleteBandMemberPosition: (
    bandID: number,
    memberID: number,
    positionID: number,
  ) => {
    return request.delete(
      `/api/band/${bandID}/member/${memberID}/positions/${positionID}`,
    );
  },
  addBandArea: (bandID: number, areaID: number) => {
    console.log('add Band Area', bandID, areaID);
    return request.post(`/api/band/${bandID}/areas/${areaID}`);
  },
  deleteBandArea: (bandID: number, areaID: number) => {
    console.log('delete Band Area', bandID, areaID);
    return request.delete(`/api/band/${bandID}/areas/${areaID}`);
  },
  addBandDay: (bandID: number, dayID: number) => {
    return request.post(`/api/band/${bandID}/days/${dayID}`);
  },
  deleteBandDay: (bandID: number, dayID: number) => {
    return request.delete(`/api/band/${bandID}/days/${dayID}`);
  },
  addBandGenre: (bandID: number, genreID: number) => {
    return request.post(`/api/band/${bandID}/genres/${genreID}`);
  },
  deleteBandGenre: (bandID: number, genreID: number) => {
    return request.delete(`/api/band/${bandID}/genres/${genreID}`);
  },
  updateBandDescription: (bandID: number, newDescription: string) => {
    return request.post(`/api/band/${bandID}/description`, {
      description: newDescription,
    });
  },
  addBandPractice: (bandID: number, newPractice: AddPerformanceType) => {
    return request.post(`/api/band/${bandID}/practice`, newPractice);
  },
  deleteBandPractice: (bandID: number, practiceID: number) => {
    return request.delete(`/api/band/${bandID}/practice/${practiceID}`);
  },
  updateBandPractice: (
    bandID: number,
    updatedPractice: PerformanceRecordType,
  ) => {
    return request.put(`/api/band/${bandID}/practice/${updatedPractice.id}`, {
      musicTitle: updatedPractice.musicTitle,
      performDate: updatedPractice.performDate,
      urls: updatedPractice.urls,
    });
  },
  addBandGig: (bandID: number, newGig: AddPerformanceType) => {
    return request.post(`/api/band/${bandID}/gig`, newGig);
  },
  deleteBandGig: (bandID: number, gigID: number) => {
    return request.delete(`/api/band/${bandID}/gig/${gigID}`);
  },
  updateBandGig: (bandID: number, updatedGig: PerformanceRecordType) => {
    return request.put(`/api/band/${bandID}/gig/${updatedGig.id}`, {
      musicTitle: updatedGig.musicTitle,
      performDate: updatedGig.performDate,
      urls: updatedGig.urls,
    });
  },
  addBandPhoto: (bandID: number, newPhoto: File) => {
    const formData = new FormData();
    formData.append('image', newPhoto);
    return request.post(`/api/band/${bandID}/photos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteBandPhoto: (bandID: number, photoID: number) => {
    return request.delete(`/api/band/${bandID}/photos/${photoID}`);
  },
};

export default BandProfileAPI;
