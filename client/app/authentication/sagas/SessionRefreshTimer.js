import { call, put, cancelled, cancel, takeLatest, select } from 'redux-saga/effects'
import { delay } from 'redux-saga';
import moment from 'moment';
import { actionTypes as accountActionTypes } from '../../accounts/constants';
import { actionTypes as authActionTypes } from '../constants';
import {
  refreshTokenRequest,
  refreshTokenFailure,
  refreshTokenRequestCancelled,
} from '../actions';
import * as SessionTimer from '../services/SessionTimer';
import { currentAccessToken } from '../selector';


const refreshTokenIn = token => {
  const expiresIn = token.get('expiresIn');
  const createdAt = token.get('createdAt');
  const expireAt = moment.utc(createdAt).add(expiresIn, 'seconds').format();
  const tenSeconds = 10000;
  const durationBeforeExpiry = tenSeconds;

  return SessionTimer.refreshIn(expireAt, durationBeforeExpiry);
}

export function* refreshDelay(action) {
  try {
    let accessToken = yield select(currentAccessToken);
    yield delay(refreshTokenIn(accessToken), true);

    yield put(refreshTokenRequest());
  } catch (err) {
    yield put(refreshTokenFailure());
  } finally {
    if (yield cancelled()) {
      yield put(refreshTokenRequestCancelled());
    }
  }
}

function* cancelRefreshTimer(task) {
  yield cancel(task);
}

export default function* SessionRefreshTimer() {
  // What does this line do
  const refreshTimer = yield takeLatest(authActionTypes.STORE_TOKEN_SUCCESS, refreshDelay);
  yield takeLatest(authActionTypes.SIGN_OUT_SUCCESS, cancelRefreshTimer, refreshTimer);
}
