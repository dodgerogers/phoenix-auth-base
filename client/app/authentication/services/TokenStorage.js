import moment from 'moment';


export const STORAGE_KEY = 'token';
const storage = global.localStorage;

export const encode = token => btoa(JSON.stringify(token));
export const generateExpiry = token => moment(token.createdAt).add(token.expiresIn, 'seconds').toDate();

export const decode = token => {
  try {
    return JSON.parse(atob(token));
  } catch (err) {
    return null;
  }
};

export const store = token => {
  return new Promise((resolve, reject) => {
    try {
      storage.setItem(STORAGE_KEY, encode(token));
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export const fetch = () => {
  return new Promise((resolve, reject) => {
    const foundToken = storage.getItem(STORAGE_KEY);
    if (foundToken === null) {
      return reject(null);
    }

    const decodedToken = decode(foundToken);
    return resolve(decodedToken);
  });
};

export const remove = () => {
  return new Promise((resolve, reject) => {
    try {
      storage.removeItem(STORAGE_KEY);
      resolve(null);
    } catch (err) {
      reject(err);
    }
  });
};
