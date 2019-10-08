import axios from 'axios';
import { env } from '../config/config';

const hostName = env.api_host;
const portName = env.api_port;
const dbName = env.api_links_path;

function listLinks() {
  return axios.get(`http://${hostName}:${portName}/${dbName}`);
}

function createLink(data) {
  return axios.post(`http://${hostName}:${portName}/${dbName}`, data);
}

export { listLinks, createLink };
