import moment from 'moment';

export const refreshTokenIn = token => {
  const expiresIn = token.get('expiresIn');
  const createdAt = token.get('createdAt');
  const expireAt = moment.utc(createdAt).add(expiresIn, 'seconds').format();

  const tenSecondsInMs = 10000;
  const expiresInMs = expiresIn * 1000;
  const refreshInMs = expiresInMs - tenSecondsInMs;

  return refreshIn(expireAt, refreshInMs);
}

export const refreshIn = (expireAt, expirationWindowInMs) => {
  const expireAtInMs = moment(expireAt).valueOf();
  const currentTimeInMs = moment.utc().valueOf();
  const executeCallbackTimeInMs = Math.max(0, expireAtInMs - currentTimeInMs - expirationWindowInMs);

  return executeCallbackTimeInMs;
}
