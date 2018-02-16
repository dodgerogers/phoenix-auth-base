import moment from 'moment';

export const refreshIn = (expireAt, expirationWindowInMs) => {
  const expireAtInMs = moment(expireAt).valueOf();
  const currentTimeInMs = moment.utc().valueOf();
  const executeCallbackTimeInMs = Math.max(0, expireAtInMs - currentTimeInMs - expirationWindowInMs);

  return executeCallbackTimeInMs;
}
