// 밴드 지원, 멤버 초대 관련 API
import { AxiosResponse } from 'axios';
import { request } from './request';

interface BandRequestApiType {
  ApplyBand: (postId: string) => Promise<AxiosResponse>;
};

const BandRequestProcess: BandRequestApiType = {
  ApplyBand: (postId) => {
    return request.post('api/request/apply?postId=' + postId);
  }
  

};

export default BandRequestProcess;