import { AxiosResponse } from 'axios';
import { request } from './request';

interface WritePostApiType {
  UploadArticle: (postInfo: {
    id: number;
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
