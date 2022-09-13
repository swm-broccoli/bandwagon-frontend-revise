import axios, { AxiosResponse } from 'axios';

const baseURL =
  'http://bandwagon-vpc-alb-private-dev-830505980.ap-northeast-2.elb.amazonaws.com/';

interface MainPageApiType {
  getPopularPost: () => Promise<AxiosResponse>;
}

const MainPageAPI: MainPageApiType = {
  getPopularPost: () => axios.get(baseURL + 'api/post/popular'),
};
