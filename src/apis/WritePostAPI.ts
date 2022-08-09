import { AxiosResponse } from 'axios';
import { request } from './request';

interface WritePostApiType {
  UploadArticle: (postInfo: {
    title: string;
    body: string | undefined;
  }) => Promise<AxiosResponse>;
}

const WritePostAPI: WritePostApiType = {
  UploadArticle: (postInfo) => {
    console.log(postInfo);
    return request.post('api/band/post', postInfo);
  },
};

export default WritePostAPI;
