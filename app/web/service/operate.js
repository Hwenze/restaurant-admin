import axios from '~web/utils/axios';

export const operateService = {
    getUserInfo() {
        return axios.get('/operate/getUserInfo');
    },
    // 员工列表
    gerUserList(params) {
        return axios.get('/operate/getUserList', params);
    },
}

export const roleService = {
    // 获取权限列表
    getRoleList(){
        return axios.get('/operate/getRoleList');
    }
}
