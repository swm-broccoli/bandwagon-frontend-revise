import { AxiosResponse } from 'axios';
import { request } from './request';

interface WritePostApiType {
  LoadBandInfo: () => Promise<AxiosResponse>;
  UploadArticle: (postInfo: {
    title: string;
    body: string | undefined;
    dtype: string;
  }) => Promise<AxiosResponse>;
}

const WritePostAPI: WritePostApiType = {
  LoadBandInfo: () => {
    return request.get('api/band');
  },
  UploadArticle: (postInfo) => {
    console.log(postInfo);
    return request.post('api/post', postInfo);
  },
};

export default WritePostAPI;
