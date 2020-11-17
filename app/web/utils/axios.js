import axios from 'axios';
import qs from 'qs';
import Storage from './storage';
import { TOKEN_KEY } from './constant';

// 创建axios
let request = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  // baseURL: 'http://172.18.3.51:3000',
  // baseURL: 'http://project.fhk255.cn',
  withCredentials: true,
  credentials: 'include'
});
// 发送请求
request.interceptors.request.use(
  config => {
    if (Storage && Storage.getItem(TOKEN_KEY)) {
      config.headers['Authorization'] = Storage.getItem(TOKEN_KEY);
    }
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    // 请求拦截: 失败
    console.error('请求失败： ', error);
    return error;
  }
);

// 接受回调
request.interceptors.response.use(
  response => {
    // 响应拦截: 成功
    if (response.data.code === 401 || response.data.code === 400) {
      window.location.href = '/logout';
    }
    return response;
  },
  error => {
    // 响应拦截: 失败
    return error;
  }
);

const http = {
  get: (url, params = {}, isSelf = false) => {
    if (isSelf) {
      request.defaults.baseURL = 'http://127.0.0.1:8081';
      request.defaults.credentials = 'include';
    }
    return new Promise((resolve, reject) => {
      request({
        url: url,
        params,
        method: 'get',
      }).then(res => {
        if (res && res.data && res.data.code == 200) {
          resolve(res.data);
        } else {
          resolve(res.data);
        }
      }).catch(err => {
        reject(err);
      })
    })
  },
  post: (url, data, isSelf = false) => {
    let config = {
      url: url,
      data,
      method: 'post'
    }
    if (isSelf) {
      request.defaults.baseURL = 'http://127.0.0.1:8081';
      request.defaults.credentials = 'include';
    }
    return new Promise((resolve, reject) => {
      request(config).then(res => {
        if (res && res.data && res.data.code == 200) {
          resolve(res.data);
        } else {
          resolve(res.data);
        }
      }).catch(err => {
        reject(err);
      })
    })
  },
}

export default http;