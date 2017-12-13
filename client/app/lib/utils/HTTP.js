import axios from 'axios';
import store from '../../store';

export const API_BASE = 'http://localhost:4000'; // TODO window.location.origin

const HTTP = axios.create({
  baseURL: API_BASE,
});

HTTP.interceptors.request.use(config => {
  const accessToken = store.getState().authentication.getIn(['accessToken', 'access_token']);

  if (accessToken) {
    config.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
  else {
    const { Authorization, ...headers } = config.headers.common;
    config.headers.common = headers;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});


export default HTTP;
