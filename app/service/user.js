'use strict';
const axios = require('axios');


module.exports = app => {
    return class UserService extends app.Service {
        async fetch(method, api, data) {

            const request = axios.create({
                baseURL: 'http://127.0.0.1:8080',
                withCredentials: true,
                credentials: 'include'
            });
            // 发送请求
            request.interceptors.request.use(
                config => {
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
                    return response;
                },
                error => {
                    // 响应拦截: 失败
                    return error;
                }
            )
            const result = await new Promise((resolve, reject) => {
                let config = {
                    url: api,
                    method: method,
                    credentials: 'include'
                }
                if (method === 'get') {
                    config.params = data;
                } else {
                    config.data = data;
                }
                return request(config).then(res => {
                    resolve(res.data);
                }).catch(err => {
                    reject(err);
                })
            })
            return result;
        }
    };
};