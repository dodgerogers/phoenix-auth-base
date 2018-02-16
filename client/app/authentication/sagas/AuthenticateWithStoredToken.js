import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as TokenStorage from '../lib/TokenStorage';
import { actionTypes } from '../constants';
import { verifyToken, authenticateFailure } from '../actions';


export function* fetchAndVerifyStoredToken() {
  try {
    const accessToken = yield call(TokenStorage.fetch);

    yield put(verifyToken(accessToken));
  } catch (err) {
    yield put(authenticateFailure());
  }
}

export function* AuthenticateWithStoredToken() {
  yield takeLatest(actionTypes.AUTHENTICATE_WITH_STORED_TOKEN_REQUEST, fetchAndVerifyStoredToken);
}

export default AuthenticateWithStoredToken;
