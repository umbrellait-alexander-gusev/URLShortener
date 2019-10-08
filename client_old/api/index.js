import axios from 'axios';
import env from '../config/config'

const hostName = env.api_host;
// const hostName = 'localhost';
const portName = env.api_port;
// const portName = '3000';
const dbName = env.api_links_path;
// const dbName = 'links';

export default {
    listLinks() {
        return axios.get(`http://${hostName}:${portName}/${dbName}`);
    },

    createLink(data) {
        return axios.post(`http://${hostName}:${portName}/${dbName}`, data);
    }
}
