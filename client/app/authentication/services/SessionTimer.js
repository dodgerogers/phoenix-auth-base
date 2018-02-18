import moment from 'moment';

export const refreshIn = (expireAt, executeBeforeExpirationInMs) => {
  const expireAtInMs = moment(expireAt).valueOf();
  const currentTimeInMs = moment.utc().valueOf();
  const executeCallbackTimeInMs = Math.max(0, expireAtInMs - currentTimeInMs - executeBeforeExpirationInMs);

  return executeCallbackTimeInMs;
}
