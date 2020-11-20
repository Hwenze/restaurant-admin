import axios from '~web/utils/axios';

export function getHomeRotation(params) {
    return axios.get('/api/getHomeRotation', params);
}

export function getRotationDateils(params) {
    return axios.get('/api/getRotationDateils', params);
}

export function changeStatus(params) {
    return axios.post('/api/changeRotationStatus', params);
}

export function updateRotationDateils(params) {
    return axios.post('/api/updateRotationDateils', params);
}