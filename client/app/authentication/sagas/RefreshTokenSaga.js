import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { delay } from 'redux-saga';
import * as AuthenticationSources from '../sources';
import { actionTypes } from '../constants';
import * as SessionTimer from '../services/SessionTimer';


const accessTokenSelector = state => state.authentication.get('accessToken');

export function* refreshDelay(action) {
  try {
    const accessToken = yield select(accessTokenSelector);
    yield delay(SessionTimer.refreshTokenIn(accessToken), true);

    yield put({ type: actionTypes.REFRESH_TOKEN_REQUEST });
  } catch (err) {
    yield put({ type: actionTypes.REFRESH_TOKEN_FAILURE });
  }
}

export function* RefreshTokenSaga() {
  yield takeLatest(actionTypes.VERIFY_TOKEN_SUCCESS, refreshDelay); // TODO: may change
}

export default RefreshTokenSaga;
