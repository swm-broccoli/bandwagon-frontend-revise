// 포트폴리오 정보 불러오기 API
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { request } from './request';

const baseURL = 'https://api.bandwagon-back.com';

interface PortfolioApiType {
  getUserPortfolioInfo: (userEmail: string) => Promise<AxiosResponse>;
  getBandPortfolioInfo: (bandID: number) => Promise<AxiosResponse>;
}

const PortfolioAPI: PortfolioApiType = {
  getUserPortfolioInfo: (userEmail: string) => {
    return request.get(`${baseURL}/api/users/${userEmail}/mypage`);
  },
  getBandPortfolioInfo: (bandID: number) => {
    return axios.get(`/api/band/${bandID}/bandpage`);
  },
};

export default PortfolioAPI;
