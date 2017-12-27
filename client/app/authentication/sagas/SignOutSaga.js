import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { NotificationActions } from '../../common/Notifications';
import { actionTypes } from '../constants';
import * as TokenStorage from '../lib/TokenStorage';


const purgeTokenSuccess = () => ({
  type: actionTypes.PURGE_TOKEN_SUCCESS,
});

const purgeTokenFailure = () => ({
  type: actionTypes.PURGE_TOKEN_FAILURE,
});

export function* purgeToken(action) {
  try {
    const tokenCookie = yield call(TokenStorage.remove);

    yield put(purgeTokenSuccess());
    yield put(NotificationActions.notify('Signed out successfully!'));
  } catch (err) {
    yield put(purgeTokenFailure());
    yield put(NotificationActions.notifyError(err));
  }
}

export function* SignOutSaga() {
  yield takeLatest(actionTypes.SIGN_OUT_SUCCESS, purgeToken);
}

export default SignOutSaga;
