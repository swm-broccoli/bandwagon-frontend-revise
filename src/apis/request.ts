import axios, {AxiosInstance} from 'axios';

function setInterceptors (instance: AxiosInstance) {
  // API 요청 이전 처리
  instance.interceptors.request.use((config) => {
    // header에 access token 추가
    return config;
  },
  (error) => Promise.reject(error),
  );

  // API 응답 후 처리
  instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if (error.response.status == 401) {
      // token이 존재하지 않음
    } else if (error.response.status == 403) {
      // access token 만료
    } else if (error.response.status == 404) {
      // 가입된 밴드 없음
    } else {
      // 기타 오류는 alert 처리
    }
    });
  return instance;
}

const createInstance = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'},
  });
  return setInterceptors(instance);
};

export const request = createInstance();