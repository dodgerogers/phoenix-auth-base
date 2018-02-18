import { call, put, takeLatest } from 'redux-saga/effects'
import * as TokenStorage from '../services/TokenStorage';
import { actionTypes } from '../constants';
import { verifyTokenRequest, authenticateFailure } from '../actions';


export function* fetchAndVerifyStoredToken() {
  try {
    const accessToken = yield call(TokenStorage.fetch);

    yield put(verifyTokenRequest(accessToken));
  } catch (err) {
    yield put(authenticateFailure());
  }
}

export default function* AuthenticateFromCookie() {
  yield takeLatest(actionTypes.AUTHENTICATE_WITH_STORED_TOKEN_REQUEST, fetchAndVerifyStoredToken);
}
