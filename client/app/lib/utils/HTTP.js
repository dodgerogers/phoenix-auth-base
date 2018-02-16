import axios from 'axios';
import normalize from 'normalize-object';
import store from '../../store';
import { currentAccessToken } from '../../authentication/selector';


const localhost = 'http://localhost';
export const API_BASE = process.env.NODE_ENV === 'test' ? localhost : window.location.origin;
const HTTP = axios.create({ baseURL: API_BASE });

HTTP.interceptors.request.use(requestInterceptor, function(error) {
  return Promise.reject(error);
});

HTTP.interceptors.response.use(response => { // TODO: Handle 401
  response.data = normalize(response.data);
  return response;
}, function(error) {
  return Promise.reject(error);
});

const getAccessToken = state => state.authentication.getIn(['accessToken', 'accessToken']);
const isTokenRefreshing = state => state.authentication.get('refreshing');

async function requestInterceptor(config) {
  return waitForAccessToken(config.url)
    .then(accessToken => transformRequest(config, accessToken));
};

async function waitForAccessToken(url) {
  try {
    if (!isTokenRefreshRequest(url) && isTokenRefreshing(store.getState())) {
      return await sleep(waitForAccessToken, url);
    }
    return getAccessToken(store.getState());
  } catch(e) {
    return null;
  }
}

function isTokenRefreshRequest(url) {
  return url && url.indexOf('/oauth/token/refresh') > -1; // TODO: ?
}

function sleep(fn, args) {
  return new Promise(resolve => {
    setTimeout(() => resolve(fn(args)), 1000)
  });
}

function transformRequest(config, accessToken) {
  if (accessToken) {
    config.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } else {
    const { Authorization, ...headers } = config.headers.common;
    config.headers.common = headers;
  }

  config.data = normalize(config.data, 'snake');

  return config;
}

export default HTTP;
