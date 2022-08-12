import { AxiosResponse } from 'axios';
import { request } from './request';

interface RecruitPostApiType {
  LoadMyBandInfo: () => Promise<AxiosResponse>;
  LoadBandInfo: (bandId: number | undefined) => Promise<AxiosResponse>;
  LoadPost: (postID: string | undefined) => Promise<AxiosResponse>;
  UploadArticle: (postInfo: {
    title: string;
    body: string | undefined;
    dtype: string;
  }) => Promise<AxiosResponse>;
}

const RecruitPostAPI: RecruitPostApiType = {
  LoadMyBandInfo: () => {
    return request.get('api/band');
  },
  LoadBandInfo: (bandId) => {
    return request.get('api/band/' + bandId?.toString() + '/bandpage')
  },
  LoadPost: (postID) => {
    return request.get('api/post/' + postID);
  },
  UploadArticle: (postInfo) => {
    console.log(postInfo);
    return request.post('api/post', postInfo);
  },
};

export default RecruitPostAPI;
