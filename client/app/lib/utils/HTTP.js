import axios from 'axios';
import normalize from 'normalize-object';
import store from '../../store';
import { currentAccessTokenValue, isTokenRefreshing } from '../../authentication/selector';
import wait from './wait';


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

async function requestInterceptor(config) {
  return waitForAccessToken(config.url)
    .then(accessToken => transformRequest(config, accessToken));
};

async function waitForAccessToken(url) {
  try {
    if (!isTokenRefreshRequest(url) && isTokenRefreshing(store.getState())) {
      return await wait(waitForAccessToken, url);
    }
    return currentAccessTokenValue(store.getState());
  } catch(e) {
    return null;
  }
}

function isTokenRefreshRequest(url) {
  return url && url.indexOf('/oauth/token/refresh') > -1;
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
