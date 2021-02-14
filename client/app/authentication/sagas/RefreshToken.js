import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as AuthenticationSources from '../sources';
import { actionTypes } from '../constants';
import { getCurrentAccountRequest } from '../../accounts/actions';
import {
  storeTokenRequest, refreshTokenFailure, signOutRequest
} from '../actions';


export function* refreshCurrentToken() {
  try {
    const response = yield call(AuthenticationSources.extendSession);
    const { accessToken } = response.data;

    yield put(storeTokenRequest(accessToken));
  } catch (err) {
    yield put(refreshTokenFailure());
    yield put(signOutRequest());
  }
}

export default function* RefreshToken() {
  yield takeLatest(actionTypes.REFRESH_TOKEN_REQUEST, refreshCurrentToken);
}
