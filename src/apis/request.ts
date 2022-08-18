import axios, { AxiosInstance } from 'axios';
import AuthAPI from './AuthAPI';

function setInterceptors(instance: AxiosInstance) {
  // API 요청 이전 처리
  instance.interceptors.request.use(
    (config) => {
      // header에 access token 추가
      const token = localStorage.getItem('accessToken');
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // API 응답 후 처리
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status == 401) {
        // token이 존재하지 않음
        window.alert(error.response.data.errorMessage);
        return AuthAPI.logOut();
      } else if (error.response.status == 403) {
        // access token 만료
        axios
          .post(
            'http://bandwagon-vpc-alb-private-dev-830505980.ap-northeast-2.elb.amazonaws.com/api/refresh',
            {
              refreshToken: localStorage.getItem('refreshToken'),
            },
          )
          .then((response) => {
            localStorage.setItem('accessToken', response.data.accessToken);
            error.config.headers.Authorization =
              'Bearer ' + response.data.accessToken;
            return instance.request(error.config);
          })
          .catch((error) => {
            return AuthAPI.logOut();
          });
      } else if (error.response.status == 404) {
        // 가입된 밴드 없음
      } else {
        // 기타 오류는 alert 처리
        console.log(error.response.data.errorMessage);
        return window.alert(error.response.data.errorMessage);
      }
    },
  );
  return instance;
}

const createInstance = () => {
  const instance = axios.create({
    baseURL:
      'http://bandwagon-vpc-alb-private-dev-830505980.ap-northeast-2.elb.amazonaws.com/',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
  });
  return setInterceptors(instance);
};

export const request = createInstance();
