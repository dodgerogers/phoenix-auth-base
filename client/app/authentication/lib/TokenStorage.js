import Cookies from 'js-cookie';
import moment from 'moment';


export const COOKIE_KEY = 'token';
export const generateExpiry = token => moment(token.created_at).add(token.expires_in, 'seconds').toDate();
export const encode = token => btoa(JSON.stringify(token));
export const decode = token => {
  try {
    return JSON.parse(atob(token));
  } catch (err) {
    return null;
  }
};

export const store = token => {
  return new Promise((resolve, reject) => {
    const expires = generateExpiry(token);
    const cookie = Cookies.set(COOKIE_KEY, encode(token), { expires });

    if (cookie) {
      return resolve(cookie);
    }

    reject(null);
  });
}

export const fetch = () => {
  return new Promise((resolve, reject) => {
    const encodedToken = Cookies.get(COOKIE_KEY);

    if (encodedToken) {
      const decodedToken = decode(encodedToken);
      return resolve(decodedToken);
    }

    reject(null);
  });
};
