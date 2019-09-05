import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
    listLinks() {
        return axios.get(`${apiPrefix}/links`);
    },

    createLink(data) {
        return axios.post(`${apiPrefix}/links`, data);
    },

    deleteLink(linkId) {
        return axios.delete(`${apiPrefix}/links/${linkId}`);
    }
}
