'use strict';
const axios = require('axios');


module.exports = app => {
    return class UserService extends app.Service {
        async fetch(api, option = {}) {

            const request = axios.create({
                baseURL: 'http://127.0.0.1:8080',
                // baseURL: 'http://172.18.3.51:3000',
                // baseURL: 'http://project.fhk255.cn',
                withCredentials: true
            });
            // 发送请求
            request.interceptors.request.use(
                config => {
                    // if (getToken()) {
                    //   config.headers['Authorization'] = getToken();
                    // }
                    // config.headers['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidGltZSI6MTU4NDg3NDY5NzI4MSwidGltZW91dCI6NjA0ODAwMDAwLCJpYXQiOjE1ODQ4NzQ2OTd9.NSfTk3yFXc2k9tF3_c-UfOr9rQ5zZca9AqRXhhN8dAk';
                    // 请求拦截: 成功
                    // if (config.method === 'post') {
                    //     // 解析请求的json
                    //     config.data = qs.stringify(config.data);
                    // }
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
                    // if (response.data.code == 401) {
                    //   MessageBox.confirm('你还没登录噢，是否去登录?', '验证失败', {
                    //     confirmButtonText: '是',
                    //     cancelButtonText: '否',
                    //     type: 'error'
                    //   }).then(() => {
                    //     removeToken();
                    //     router.push('/login');
                    //   })
                    // }
                    return response;
                },
                error => {
                    // 响应拦截: 失败
                    return error;
                }
            )
            const result = await new Promise((resolve, reject) => {
                request({
                    url: api,
                    ...option,
                    method: option.method ? option.method : 'get'
                }).then(res => {
                    resolve(res.data);
                }).catch(err => {
                    reject(err);
                })
            })
            return result;
        }
    };
};