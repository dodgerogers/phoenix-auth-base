import moment from 'moment';
import Cookies from 'js-cookie'

export const STORAGE_KEY = 'selectedProfileID';
const storage = Cookies;

export const encode = profileID => btoa(profileID);
export const decode = profileID => {
  try {
    return atob(profileID);
  } catch (err) {
    return null;
  }
};

export const store = profileID => {
  return new Promise((resolve, reject) => {
    try {
      storage.set(STORAGE_KEY, encode(profileID));
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export const fetch = () => {
  return new Promise((resolve, reject) => {
    const foundProfileID = storage.get(STORAGE_KEY);
    if (foundProfileID === null) {
      return reject(null);
    }

    const decodedProfileID = decode(foundProfileID);
    return resolve(decodedProfileID);
  });
};

export const remove = () => {
  return new Promise((resolve, reject) => {
    try {
      storage.remove(STORAGE_KEY);
      resolve(null);
    } catch (err) {
      reject(err);
    }
  });
};
