import axios from '~web/utils/axios';

export function getRealTimeInfo(params) {
    return axios.get('/activity/getRealTimeInfo', params);
}

export function getRealTimeDateils(params) {
    return axios.get('/activity/getRealTimeDateils', params);
}

export function addRealTimeInfo(params) {
    return axios.post('/activity/addRealTimeInfo', params);
}

export function updateRealTimeInfo(params) {
    return axios.post('/activity/updateRealTimeInfo', params);
}

export function deleteRealTimeInfo(params) {
    return axios.post('/activity/deleteRealTimeInfo', params);
}