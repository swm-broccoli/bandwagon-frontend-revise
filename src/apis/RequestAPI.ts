// 밴드 지원, 멤버 초대 관련 API
import { AxiosResponse } from 'axios';
import { request } from './request';

interface RequestApiType {
  ApplyBand: (postId: string) => Promise<AxiosResponse>;
  InviteBand: (userId: number) => Promise<AxiosResponse>;
  GetApplyRequest: (type: boolean) => Promise<AxiosResponse>;
  GetInviteRequest: (type: boolean) => Promise<AxiosResponse>;
  AcceptApply: (accept: boolean, requestId: number) => Promise<AxiosResponse>;
  DeleteApply: (requestId: number) => Promise<AxiosResponse>;
  AcceptInvite: (accept: boolean, requestId: number) => Promise<AxiosResponse>;
  DeleteInvite: (requestId: number) => Promise<AxiosResponse>;
};

const RequestAPI: RequestApiType = {
  ApplyBand: (postId) => {
    return request.post('api/request/apply?postId=' + postId);
  },
  InviteBand: (userId) => {
    return request.post('api/request/invite?userId=' + userId.toString());
  },
  GetApplyRequest: (type) => {
    if (type) return request.get('api/request/apply?sent=false');
    else return request.get('api/request/apply?sent=true');
  },
  GetInviteRequest: (type) => {
    if (type) return request.get('api/request/invite?sent=true');
    else return request.get('api/request/invite?sent=false');
  },
  AcceptApply: (accept, requestId) => {
    if (accept) return request.post('api/request/apply/' + requestId.toString() + '?accept=true');
    else return request.post('api/request/apply/' + requestId.toString() + '?accept=false');
  },
  DeleteApply: (requestId) => {
    return request.delete('api/request/apply/' + requestId.toString());
  },
  AcceptInvite: (accept, requestId) => {
    if (accept) return request.post('api/request/invite/' + requestId.toString() + '?accept=true');
    else return request.post('api/request/apply/' + requestId.toString() + '?accept=false');
  },
  DeleteInvite: (requestId) => {
    return request.delete('api/request/invite/' + requestId.toString());
  },
};

export default RequestAPI;