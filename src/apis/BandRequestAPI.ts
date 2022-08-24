// 밴드 지원, 멤버 초대 관련 API
import { AxiosResponse } from 'axios';
import { request } from './request';

interface BandRequestApiType {
  ApplyBand: (postId: string) => Promise<AxiosResponse>;
  GetApplyRequest: (type: boolean) => Promise<AxiosResponse>;
  GetInviteRequest: (type: boolean) => Promise<AxiosResponse>;
};

const BandRequestAPI: BandRequestApiType = {
  ApplyBand: (postId) => {
    return request.post('api/request/apply?postId=' + postId);
  },
  GetApplyRequest: (type) => {
    if (type) return request.get('api/request/apply?sent=false');
    else return request.get('api/request/apply?sent=true');
  },
  GetInviteRequest: (type) => {
    if (type) return request.get('api/request/invite?sent=true');
    else return request.get('api/request/invite?sent=false');
  }
  

};

export default BandRequestAPI;