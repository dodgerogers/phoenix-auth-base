import { call, put, cancelled, cancel, takeLatest, select } from 'redux-saga/effects'
import { delay } from 'redux-saga';
import moment from 'moment';
import { actionTypes } from '../constants';
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
  const refreshTimer = yield takeLatest(actionTypes.GET_CURRENT_USER_SUCCESS, refreshDelay);
  yield takeLatest(actionTypes.SIGN_OUT_SUCCESS, cancelRefreshTimer, refreshTimer);
}
