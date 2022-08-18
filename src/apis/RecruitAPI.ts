// 구인구직 게시판 관련 API

import { AxiosResponse } from 'axios';
import {request} from './request';

interface RecruitApiType {
  LoadBandPost: (param: string) => Promise<AxiosResponse>
  LoadUserPost: (param: string) => Promise<AxiosResponse>
}

const RecruitAPI: RecruitApiType = {
  LoadBandPost: (param) => {
    return request.get('api/band/post' + param);
  },
  LoadUserPost: (param) => {
    return request.get('api/user/post' + param);
  }
}

export default RecruitAPI;