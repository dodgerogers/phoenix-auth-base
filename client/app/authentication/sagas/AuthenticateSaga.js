import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as AuthenticationSources from '../sources';
import { actionTypes } from '../constants';
import * as TokenStorage from '../lib/TokenStorage';


const verifyTokenSuccess = user => ({
  type: actionTypes.VERIFY_TOKEN_SUCCESS,
  user,
});

const verifyTokenFailure = () => ({
  type: actionTypes.VERIFY_TOKEN_FAILURE,
});

export function* verifyToken(action) {
  try {
    const response = yield call(AuthenticationSources.currentUser);
    const tokenCookie = yield call(TokenStorage.store, action.accessToken);

    yield put(verifyTokenSuccess(response.data.user));
  } catch (_err) {
    yield put(verifyTokenFailure());
  }
}

export function* authenticateSaga() {
  yield takeLatest(actionTypes.VERIFY_TOKEN, verifyToken);
}

export default authenticateSaga;
