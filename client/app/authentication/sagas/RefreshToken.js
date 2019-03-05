import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as AuthenticationSources from '../sources';
import { actionTypes } from '../constants';
import { getCurrentUserRequest } from '../../accounts/actions';
import {
  refreshTokenSuccess, refreshTokenFailure, signOutRequest
} from '../actions';


export function* refreshCurrentToken() {
  try {
    const response = yield call(AuthenticationSources.extendSession);

    yield put(refreshTokenSuccess(response.data.accessToken));
    yield put(getCurrentUserRequest());
  } catch (err) {
    yield put(signOutRequest());
    yield put(refreshTokenFailure());
  }
}

export default function* RefreshToken() {
  yield takeLatest(actionTypes.REFRESH_TOKEN_REQUEST, refreshCurrentToken);
}
