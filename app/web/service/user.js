import axios from '~web/utils/axios';

export const userService = {
    getUserInfo(){
        return axios('/user');
    }
}
