import axios from '~web/utils/axios';

export const operateService = {
    getUserInfo() {
        return axios.get('/operate/getUserInfo');
    },
    gerUserList(params) {
        return axios.get('/operate/getUserList', params);
    },
}
