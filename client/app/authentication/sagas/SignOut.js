import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import * as AuthenticationSources from '../sources';
import { signOutSuccess, signOutFailure, removeTokenRequest } from '../actions';
import { NotificationActions } from '../../common/Notifications';
import { actionTypes } from '../constants';
import { removeCurrentAccountRequest } from '../../accounts/actions';


function notifyUserSignedOutSuccessfully() {
  return NotificationActions.notify('Signed out successfully!');
};

function notifyErrorSigningOut(err) {
  const errorMsg = err.response ? err.response.data.error : toString(err);
  return NotificationActions.notifyError(errorMsg);
}

export function* signOutAndRemoveToken(action) {
  try {
    yield call(AuthenticationSources.signOut);

    yield put(removeTokenRequest());
    yield put(removeCurrentAccountRequest())
    yield put(notifyUserSignedOutSuccessfully());
  } catch (err) {
    yield put(notifyErrorSigningOut(err));
  }
}

export default function* SignOut() {
  yield takeLatest(actionTypes.SIGN_OUT_REQUEST, signOutAndRemoveToken);
}
