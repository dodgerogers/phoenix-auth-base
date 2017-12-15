import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as AuthenticationSources from '../sources';
import { actionTypes } from '../constants';
import * as TokenStorage from '../lib/TokenStorage';


const getCurrentUserSuccess = user => ({
  type: actionTypes.GET_CURRENT_RESOURCE_SUCCESS,
  user,
});

const getCurrentUserFailure = () => ({
  type: actionTypes.GET_CURRENT_RESOURCE_FAILURE,
});

export function* fetchUserAndStoreToken(action) {
  try {
    const response = yield call(AuthenticationSources.currentUser);
    const tokenCookie = yield call(TokenStorage.store, action.accessToken);

    yield put(getCurrentUserSuccess(response.data.user));
  } catch (_err) {
    yield put(getCurrentUserFailure());
  }
}

export function* loginSaga() {
  yield takeLatest(actionTypes.AUTHENTICATE_SUCCESS, fetchUserAndStoreToken);
}

export default loginSaga;
