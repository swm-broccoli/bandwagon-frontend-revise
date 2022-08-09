import { AxiosResponse } from 'axios';
import { request } from './request';

interface BandProfileApiType {
  createBand: (bandName: string) => Promise<AxiosResponse<any>>;
  getBandProfileInfo: () => Promise<AxiosResponse>;
}

const BandProfileAPI: BandProfileApiType = {
  createBand: (bandName: string) => {
    return request.post('/api/band/create', {
      name: bandName,
    });
  },
  getBandProfileInfo: () => {
    // status 검증을 안 하고 무조건 통과시킨다. 따라서 404 Response 에러도 그대로 돌아온다.
    return request.get(`/api/band`, { validateStatus: () => true });
  },
};

export default BandProfileAPI;
