import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as AuthenticationSources from '../sources';
import { actionTypes } from '../constants';
import { verifyTokenSuccess, verifyTokenFailure } from '../actions';
import * as TokenStorage from '../lib/TokenStorage';


export function* storeTokenAndFetchCurrentUser(action) {
  try {
    const response = yield call(AuthenticationSources.currentUser);
    const tokenCookie = yield call(TokenStorage.store, action.accessToken);

    yield put(verifyTokenSuccess(response.data.user));
  } catch (_err) {
    yield call(TokenStorage.remove);
    yield put(verifyTokenFailure());
  }
}

export function* VerifyAccessToken() {
  yield takeLatest(actionTypes.VERIFY_TOKEN, storeTokenAndFetchCurrentUser);
}

export default VerifyAccessToken;
