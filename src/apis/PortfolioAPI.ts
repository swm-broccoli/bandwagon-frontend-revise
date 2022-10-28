// 포트폴리오 정보 불러오기 API
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { request } from './request';

const baseURL = import.meta.env.VITE_BASE_URL;

interface PortfolioApiType {
  getUserPortfolioInfo: (userEmail: string) => Promise<AxiosResponse>;
  getBandPortfolioInfo: (bandID: number) => Promise<AxiosResponse>;
}

const PortfolioAPI: PortfolioApiType = {
  getUserPortfolioInfo: (userEmail: string) => {
    return axios.get(`${baseURL}api/users/${userEmail}/mypage`);
  },
  getBandPortfolioInfo: (bandID: number) => {
    return axios.get(`${baseURL}api/band/${bandID}/bandpage`);
  },
};

export default PortfolioAPI;
