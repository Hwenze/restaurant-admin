
import axios from '~web/utils/axios';

export const selfService = {
  login(params) {
    return axios.post('/login/callback', params, true);
  },
  logout(params) {
    return axios.get('/logout', params, true);
  }
}
