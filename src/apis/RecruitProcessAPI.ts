// 지원 가능 조건, 지원 양식 관련 API

import { AxiosResponse } from 'axios';
import {request} from './request';

interface RecruitProcessApiType {
  sendPrequisites: (preqInfo: {
    dtype: string;
    min: number | null;
    max: number | null;
    gender: boolean | null;
    areas: {id: number}[] | null;
    genres: {id: number}[] | null;
    positions: {id: number}[] | null;
  }, postId: string, preqId: number) => Promise<AxiosResponse>,
  getPrequisites: (postId: string) => Promise<AxiosResponse>,
  checkPrequisites: (postId: string | undefined) => Promise<AxiosResponse>,
  checkNotification: () => Promise<AxiosResponse>,
  getNotification: () => Promise<AxiosResponse>
}

const RecruitProcessAPI: RecruitProcessApiType = {
  sendPrequisites: (preqInfo, postId, preqId) => {
    console.log(preqInfo);
    if (preqId) return request.put('api/band/post/' + postId + '/prerequisites/' + preqId.toString(), preqInfo);
    else return request.post('api/band/post/' + postId + '/prerequisites', preqInfo);
  },
  getPrequisites: (postId) => {
    return request.get('api/band/post/' + postId + '/prerequisites');
  },
  checkPrequisites: (postId) => {
    return request.get('/api/band/post/' + postId + '/prerequisites/check');
  },
  checkNotification: () => {
    return request.get('api/notifications/count');
  },
  getNotification: () => {
    return request.get('api/notifications');
  }
}

export default RecruitProcessAPI;