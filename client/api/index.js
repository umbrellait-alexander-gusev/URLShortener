import axios from 'axios';

const hostName = document.domain;
// import { apiPrefix } from '../../etc/config.json';

export default {
    listLinks() {
        return axios.get(`${hostName}/links`);
        // return axios.get(`${apiPrefix}/links`);
    },

    createLink(data) {
        return axios.post(`${hostName}/links`, data);
        // return axios.post(`${apiPrefix}/links`, data);
    },

    deleteLink(linkId) {
        return axios.delete(`${hostName}/links/${linkId}`);
        // return axios.delete(`${apiPrefix}/links/${linkId}`);
    }
}
