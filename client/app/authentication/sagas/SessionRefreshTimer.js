import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { delay } from 'redux-saga';
import moment from 'moment';
import * as AuthenticationSources from '../sources';
import { actionTypes } from '../constants';
import { refreshTokenRequest, refreshTokenFailure } from '../actions';
import * as SessionTimer from '../services/SessionTimer';
import { currentAccessToken } from '../selector';


const refreshTokenIn = token => {
  const expiresIn = token.get('expiresIn');
  const createdAt = token.get('createdAt');
  const expireAt = moment.utc(createdAt).add(expiresIn, 'seconds').format();
  const tenSecondsInMsBeforeExpiry = 10000;

  return SessionTimer.refreshIn(expireAt, tenSecondsInMsBeforeExpiry);
}

export function* refreshDelay(action) {
  try {
    let accessToken = yield select(currentAccessToken);

    yield delay(refreshTokenIn(accessToken), true);
    yield put(refreshTokenRequest());
  } catch (err) {
    yield put(refreshTokenFailure());
  }
}

export function* SessionRefreshTimer() {
  yield takeLatest(actionTypes.VERIFY_TOKEN_SUCCESS, refreshDelay);
}

export default SessionRefreshTimer;
