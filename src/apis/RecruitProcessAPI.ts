// 지원 가능 조건, 지원 양식 관련 API

import {request} from './request';
import { AxiosResponse } from 'axios';

interface RecruitProcessApiType {
  sendPrequisites: (preqInfo: {
    dtype: string;
    min: number | null;
    max: number | null;
    gender: boolean | null;
    areas: {id: number}[] | null;
    genres: {id: number}[] | null;
    positions: {id: number}[] | null;
  }, postId: string) => Promise<AxiosResponse>,
  getPrequisites: (postId: string) => Promise<AxiosResponse>
}

const RecruitProcessAPI: RecruitProcessApiType = {
  sendPrequisites: (preqInfo, postId) => {
    console.log(preqInfo);
    return request.post('api/band/post/' + postId + '/prerequisites', preqInfo);
  },
  getPrequisites: (postId) => {
    return request.get('api/band/post/' + postId + '/prerequisites');
  }
}

export default RecruitProcessAPI;