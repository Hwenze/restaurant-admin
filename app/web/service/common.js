
import axios from '~web/utils/axios';

export const commonService = {
    login(params) {
        return axios.post('/login', params);
    }
}
