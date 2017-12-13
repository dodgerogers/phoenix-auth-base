import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as AuthenticationSources from '../sources';
import { actionTypes } from '../constants';


const getCurrentUserSuccess = user => ({
  type: actionTypes.GET_CURRENT_RESOURCE_SUCCESS,
  user,
});

const getCurrentUserFailure = error => ({
  type: actionTypes.GET_CURRENT_RESOURCE_FAILURE,
  error,
});

export function* fetchCurrentUser(action) {
  try {
    const response = yield call(AuthenticationSources.currentUser);

    yield put(getCurrentUserSuccess(response.data.user));
  } catch (err) {
    yield put(getCurrentUserFailure(err.response.data.error));
  }
}

export function* getCurrentResource() {
  yield takeLatest(actionTypes.AUTHENTICATE_SUCCESS, fetchCurrentUser);
}

export default getCurrentResource;
