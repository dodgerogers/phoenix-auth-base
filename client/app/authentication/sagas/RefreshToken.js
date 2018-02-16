import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as AuthenticationSources from '../sources';
import { actionTypes } from '../constants';
import { refreshTokenSuccess, refreshTokenFailure, verifyToken } from '../actions';


export function* refreshCurrentToken() {
  try {
    const response = yield call(AuthenticationSources.extendSession);

    yield put(refreshTokenSuccess());
    yield put(verifyToken(response.data.accessToken));
  } catch (err) {
    yield put(refreshTokenFailure());
  }
}

export function* RefreshToken() {
  yield takeLatest(actionTypes.REFRESH_TOKEN_REQUEST, refreshCurrentToken);
}

export default RefreshToken;
