import axios from 'axios';
import * as config from './config';

axios.defaults.baseURL = config.baseURL;
axios.defaults.timeout = config.timeout;
axios.defaults.headers.post['Content-Type'] = config.contentType;

export function post(action, params) {
    return new Promise((resolve, reject) => {
        axios.post(action, params)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function get(action, params) {
    return new Promise((resolve, reject) => {
        axios.get(action, params)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    })
}