
import axios from '~web/utils/axios';

export function getAgreement() {
    return axios.get('/api/getAgreement');
}

export function setAgreement(agreement) {
    console.log(agreement)
    return axios.post('/api/setAgreement', agreement);
}