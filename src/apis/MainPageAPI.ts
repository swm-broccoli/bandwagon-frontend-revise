import axios, { AxiosResponse } from 'axios';

const baseURL =
  'http://bandwagon-vpc-alb-private-dev-830505980.ap-northeast-2.elb.amazonaws.com/';

interface MainPageApiType {
  getPopularPosts: () => Promise<AxiosResponse>;
  getTodayPortfolios: () => Promise<AxiosResponse>;
}

const MainPageAPI: MainPageApiType = {
  getPopularPosts: () => axios.get(baseURL + 'api/post/popular'),
  getTodayPortfolios: () => axios.get(baseURL + 'api/random'),
};

export default MainPageAPI;
