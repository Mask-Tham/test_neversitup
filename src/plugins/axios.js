import axios from 'axios'
import Vue from 'vue'

const axiosIns = axios.create({
    baseURL:'https://candidate.neversitup.com/todo',
    headers:{'Content-Type': 'application/json'}

})

axiosIns.interceptors.request.use(function (config) {
    // Do something before request is sent

    const accessToken = Vue.prototype.$cookies.get('accessToken')

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  axiosIns.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response);
  });

  Vue.prototype.$http = axiosIns