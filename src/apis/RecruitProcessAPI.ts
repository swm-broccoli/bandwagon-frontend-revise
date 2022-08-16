// 지원 가능 조건, 지원 양식 관련 API

import { AxiosResponse } from 'axios';
import {request} from './request';

interface RecruitProcessApiType {

  checkPrequisites: (postId: string) => Promise<AxiosResponse>
}

const RecruitProcessAPI: RecruitProcessApiType = {

  checkPrequisites: (postId) => {
    return request.get('/api/band/post/' + postId + '/prerequisites/check')
  }
}

export default RecruitProcessAPI;