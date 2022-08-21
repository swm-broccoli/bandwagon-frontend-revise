import { AxiosResponse } from 'axios';
import { request } from './request';

interface RecruitPostApiType {
  LoadMyBandInfo: () => Promise<AxiosResponse>;
  LoadBandInfo: (bandId: number | undefined) => Promise<AxiosResponse>;
  LoadPost: (postId: string | undefined) => Promise<AxiosResponse>;
  LoadMyInfo: () => Promise<AxiosResponse>;
  LoadUserInfo: (userId: string | undefined) => Promise<AxiosResponse>;
  UploadArticle: (postInfo: {
    title: string;
    body: string | undefined;
    dtype: string;
  }) => Promise<AxiosResponse>;
  ChangeLike: (current: boolean, postId: string) => Promise<AxiosResponse>;
}

const RecruitPostAPI: RecruitPostApiType = {
  LoadMyBandInfo: () => {
    return request.get('api/band');
  },
  LoadBandInfo: (bandId) => {
    return request.get('api/band/' + bandId?.toString() + '/bandpage')
  },
  LoadMyInfo: () => {
    return request.get('api/users');
  },
  LoadUserInfo: (userId) => {
    return request.get('api/users/' + userId + '/mypage')
  },
  LoadPost: (postId) => {
    return request.get('api/post/' + postId);
  },
  UploadArticle: (postInfo) => {
    console.log(postInfo);
    return request.post('api/post', postInfo);
  },
  ChangeLike: (current, postId) => {
    if (current) return request.delete('api/post/' + postId + '/like');
    else return request.post('api/post/' + postId + '/like')
  },
};

export default RecruitPostAPI;
