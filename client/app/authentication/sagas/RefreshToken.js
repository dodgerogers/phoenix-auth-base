import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as AuthenticationSources from '../sources';
import { actionTypes } from '../constants';
import {
  refreshTokenSuccess, refreshTokenFailure, verifyTokenRequest, signOutRequest
} from '../actions';


export function* refreshCurrentToken() {
  try {
    const response = yield call(AuthenticationSources.extendSession);

    yield put(refreshTokenSuccess());
    yield put(verifyTokenRequest(response.data.accessToken));
  } catch (err) {
    yield put(signOutRequest());
    yield put(refreshTokenFailure());
  }
}

export default function* RefreshToken() {
  yield takeLatest(actionTypes.REFRESH_TOKEN_REQUEST, refreshCurrentToken);
}
