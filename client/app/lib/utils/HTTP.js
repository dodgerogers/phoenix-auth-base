import axios from 'axios';
import normalize from 'normalize-object';
import store from '../../store';
import { currentAccessTokenValue, isTokenRefreshing } from '../../authentication/selector';
import { removeTokenRequest } from '../../authentication/actions';
import wait from './wait';


const testUrl = 'http://localhost';
const API_BASE = process.env.NODE_ENV === 'test' ? testUrl : window.location.origin;
const HTTP = axios.create({ baseURL: API_BASE });

HTTP.interceptors.request.use(requestInterceptor, error => Promise.reject(error));
HTTP.interceptors.response.use(config => {
  config.data = normalize(config.data);

  return config;
}, error => {
  if (error.response.status === 401) {
    store.dispatch(removeTokenRequest());
  }

  error.response.data = normalize(error.response.data);
  return Promise.reject(error);
});

const normalizeKeys = data => normalize(data, 'snake');

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

const isTokenRefreshRequest = url => url && url.indexOf('/oauth/token/refresh') > -1;

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
