import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://vue-course-d0833.firebaseio.com'
});

axiosInstance.defaults.headers.common['SOMETHING'] = 'something from custom axios instance';

const reqInterceptorId = axiosInstance.interceptors.request.use(config => {
    console.log('Request Interceptor from custom axios instance', config);
    return config;
  });
  
  const resInterceptorId = axiosInstance.interceptors.response.use(res => {
    console.log('Response Interceptor from custom axios instance', res);
    return res;
  });
  
//   axiosInstance.interceptors.request.eject(reqInterceptorId);
//   axiosInstance.interceptors.response.eject(resInterceptorId);

export default axiosInstance;