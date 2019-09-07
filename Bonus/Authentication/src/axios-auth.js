import axios from 'axios';

const baseURL = 'https://identitytoolkit.googleapis.com/v1';
const apiKey = 'AIzaSyC8FAu3h9lkQ84XGqlEDSGQaS1s5ZrgyKw';

const axiosInstance = axios.create({
  baseURL
});

// axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
// axiosInstance.defaults.headers.get['Content-Type'] = 'application/json';
// axiosInstance.defaults.headers.put['Content-Type'] = 'application/json';

const apiKeyInterceptor = axiosInstance.interceptors.request.use(config => {
  config.url = config.url.replace('[API_KEY]', apiKey);
  return config;
})

axiosInstance.interceptors.request.use(config => {
  console.log('Request Interceptor from custom axios instance', config);
  return config;
});

axiosInstance.interceptors.response.use(res => {
  console.log('Response Interceptor from custom axios instance', res);
  return res;
}
  , error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error',{
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('Error', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
    console.error(error.config);
    return Promise.reject(error);
  }
);

//   axiosInstance.interceptors.request.eject(reqInterceptorId);
//   axiosInstance.interceptors.response.eject(resInterceptorId);

export default axiosInstance;