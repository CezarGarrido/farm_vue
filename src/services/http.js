import axios from 'axios';
import * as config_api from '../api'
const client = axios.create({
    baseURL: config_api.api,
    timeout: 3000,
    mode: 'no-cors',
    headers: {
        //'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'X-Requested-With': 'XMLHttpRequest',
        //'Accept': 'application/json',
        //'Content-Type': 'application/json',
        Authorization: {
            toString() {
                return `Bearer ${localStorage.getItem('token')}`
            }
        }
    }
});
export default client;