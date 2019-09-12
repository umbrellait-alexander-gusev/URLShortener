import axios from 'axios';

export default {
    listLinks() {
        return axios.get(`${process.env.REACT_APP_SERVER_API_PREFIX}/${process.env.REACT_APP_DB_NAME}`);
    },

    createLink(data) {
        return axios.post(`${process.env.REACT_APP_SERVER_API_PREFIX}/${process.env.REACT_APP_DB_NAME}`, data);
    },

    deleteLink(linkId) {
        return axios.delete(`${process.env.REACT_APP_SERVER_API_PREFIX}/${process.env.REACT_APP_DB_NAME}/${linkId}`);
    }
}
