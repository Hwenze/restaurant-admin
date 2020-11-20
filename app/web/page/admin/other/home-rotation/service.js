import axios from '~web/utils/axios';

export function getHomeRotation(params) {
    return axios.get('/api/getHomeRotation', params);
}

export function getRealTimeDateils(params) {
    return axios.get('/activity/getRealTimeDateils', params);
}

export function changeStatus(params) {
    return axios.post('/api/changeRotationStatus', params);
}

export function updateRealTimeInfo(params) {
    return axios.post('/activity/updateRealTimeInfo', params);
}