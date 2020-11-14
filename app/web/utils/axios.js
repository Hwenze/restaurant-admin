import axios from 'axios';
import qs from 'qs';
import Storage from './storage';
import Cookie from './cookie';
import { TOKEN_KEY, EGG_SESS, X_UID, X_UID_SIG } from './constant';

// 创建axios
let request = axios.create({
  baseURL: 'http://localhost:8080',
  // baseURL: 'http://172.18.3.51:3000',
  // baseURL: 'http://project.fhk255.cn',
  withCredentials: true,
  credentials: 'include'
});

// 发送请求
request.interceptors.request.use(
  config => {
    // if (Storage && Storage.getItem(TOKEN_KEY)) {
    //   config.headers['Authorization'] = Storage.getItem(TOKEN_KEY);
    // }
    config.headers['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidGltZSI6MTU4NDg3NDY5NzI4MSwidGltZW91dCI6NjA0ODAwMDAwLCJpYXQiOjE1ODQ4NzQ2OTd9.NSfTk3yFXc2k9tF3_c-UfOr9rQ5zZca9AqRXhhN8dAk';
    // 请求拦截: 成功
    config.credentials = 'include';
    if (config.method === 'post') {
      // 解析请求的json
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
      console.log(TOKEN_KEY);
      Storage && Storage.removeItem(TOKEN_KEY);
      console.log(Cookie);
      Cookie.remove(EGG_SESS);
      Cookie.remove(X_UID);
      Cookie.remove(X_UID_SIG);
      // window.location.reload();
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
      request.baseURL = 'http://localhost:8081';
    }
    return new Promise((resolve, reject) => {
      request({
        url: url,
        params,
        method: 'get'
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
      config.baseURL = 'http://localhost:8081';
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