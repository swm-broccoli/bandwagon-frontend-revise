import axios, { AxiosResponse } from 'axios';
import { request } from './request';

const baseURL =
  'http://bandwagon-vpc-alb-private-dev-830505980.ap-northeast-2.elb.amazonaws.com/';

interface MainPageApiType {
  getRecommendedRecruits: () => Promise<AxiosResponse>;
  getPopularPosts: () => Promise<AxiosResponse>;
  getTodayPortfolios: () => Promise<AxiosResponse>;
}

const MainPageAPI: MainPageApiType = {
  getRecommendedRecruits: () => {
    console.log(import.meta.env);
    return request.get(import.meta.env.VITE_BASE_URL + 'api/recommendations');
  },
  getPopularPosts: () =>
    axios.get(import.meta.env.VITE_BASE_URL + 'api/post/popular'),
  getTodayPortfolios: () =>
    axios.get(import.meta.env.VITE_BASE_URL + 'api/random'),
};

export default MainPageAPI;
