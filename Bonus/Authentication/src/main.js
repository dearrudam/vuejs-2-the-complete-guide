import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import axios from 'axios'

axios.defaults.baseURL = 'https://vue-course-d0833.firebaseio.com';
axios.defaults.headers.common['SOMETHING'] = 'something from default axios instance';

const reqInterceptorId = axios.interceptors.request.use(config => {
  console.log('Request Interceptor from Default Instance', config);
  return config;
});

const resInterceptorId = axios.interceptors.response.use(res => {
  console.log('Response Interceptor from Default Instance', res);
  return res;
});

// axios.interceptors.request.eject(reqInterceptorId);
// axios.interceptors.response.eject(resInterceptorId);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
