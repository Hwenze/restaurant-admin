import axios from '~web/utils/axios';

export const userService = {
    getUserInfo(){
        return axios.get('/user/getUserInfo');
    },
    gerUserList(params){
        return axios.get('/user/getUserList',params);
    },
}
