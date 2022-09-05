import { AxiosResponse } from 'axios';
import { request } from './request';

interface RecruitPostApiType {
  LoadMyBandInfo: () => Promise<AxiosResponse>;
  LoadBandInfo: (bandId: number | undefined) => Promise<AxiosResponse>;
  LoadPost: (postId: string | undefined) => Promise<AxiosResponse>;
  LoadLikedPost: (userId: string, param: string) => Promise<AxiosResponse>;
  LoadMyInfo: () => Promise<AxiosResponse>;
  LoadUserInfo: (userId: string | undefined) => Promise<AxiosResponse>;
  UploadArticle: (postId: string | undefined,
    postInfo: {
    title: string;
    body: string | undefined;
    dtype: string;
  }) => Promise<AxiosResponse>;
  ChangeLike: (current: boolean, postId: string) => Promise<AxiosResponse>;
  DeletePost: (postId: string | undefined) => Promise<AxiosResponse>;
  LoadMyBandPost: (page: string) => Promise<AxiosResponse>;
  LoadMyUserPost: () => Promise<AxiosResponse>;
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
  LoadLikedPost: (email, param) => {
    return request.get('api/users/' + email + '/likes' + param);

  },
  UploadArticle: (postId, postInfo) => {
    console.log(postInfo);
    if (postId) {
      return request.put('api/post/' + postId, postInfo);
    } else {
      return request.post('api/post', postInfo);
    }
  },
  ChangeLike: (current, postId) => {
    if (current) return request.delete('api/post/' + postId + '/like');
    else return request.post('api/post/' + postId + '/like')
  },
  DeletePost: (postId) => {
    return request.delete('api/post/' + postId)
  },
  LoadMyBandPost: (page) => {
    return request.get('api/my/band/post' + page);
  },
  LoadMyUserPost: () => {
    return request.get('api/my/user/post');
  }
};

export default RecruitPostAPI;
