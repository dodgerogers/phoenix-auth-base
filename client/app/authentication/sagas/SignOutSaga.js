import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as AuthenticationSources from '../sources';
import { signOutSuccess, signOutFailure } from '../actions';
import { NotificationActions } from '../../common/Notifications';
import { actionTypes } from '../constants';
import * as TokenStorage from '../lib/TokenStorage';


function notifyUserSignedOutSuccessfully() {
  return NotificationActions.notify('Signed out successfully!');
};

function notifyErrorSigningOut(err) {
  const errorMsg = err.response ? err.response.data.error : err
  return NotificationActions.notifyError(errorMsg);
}

export function* revokeAndPurgeToken(action) {
  try {
    const response = yield call(AuthenticationSources.signOut);
    const tokenCookie = yield call(TokenStorage.remove);

    yield put(signOutSuccess());
    yield put(notifyUserSignedOutSuccessfully());
  } catch (err) {
    yield put(signOutFailure());
    yield put(notifyErrorSigningOut(err));
  }
}

export function* SignOutSaga() {
  yield takeLatest(actionTypes.SIGN_OUT_REQUEST, revokeAndPurgeToken);
}

export default SignOutSaga;
