import axios from '~web/utils/axios';

export const operateService = {
    getUserInfo() {
        return axios.get('/operate/getUserInfo');
    },
    // 员工列表
    gerUserList(params) {
        return axios.get('/operate/getUserList', params);
    },
    // 添加员工
    addUser(params) {
        return axios.post('/operate/addUser', params);
    },
    // 更新用户信息
    updateUser(params) {
        return axios.post('/operate/updateUser', params);
    },
    // 冻结｜解冻员工
    changeUserStatus(uid) {
        return axios.post('/operate/changeUserStatus', { uid: uid });
    },
    // 删除员工
    deleteUser(uid) {
        return axios.post('/operate/deleteUser', { uid: uid });
    }
}

export const roleService = {
    // 获取权限列表
    getRoleList() {
        return axios.get('/operate/getRoleList');
    }
}
