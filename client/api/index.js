import axios from 'axios';
import { env } from '../config/config';

const hostName = env.api_host;
const portName = env.api_port;

function createLink(data) {
  return axios.post(`http://${hostName}:${portName}/links`, data);
}

function checkSlug(slug) {
  return axios.get(`http://${hostName}:${portName}/checkSlug`, {
    params: { slug },
  });
}

function getUrl(slug) {
  return axios.get(`http://${hostName}:${portName}/getUrl`, {
    params: { slug },
  });
}

export { createLink, checkSlug, getUrl };
