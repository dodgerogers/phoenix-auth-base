import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { initialize } from 'redux-form/immutable';
import { NotificationActions, areaIDs } from '../../common/Notifications';
import { ModalActions, ModalIds } from '../../common/modals';
import { actionTypes, formIDs } from '../constants';
import { take } from '../../lib/utils/MapHelper';

function showLoginModal() {
  return ModalActions.showModal(ModalIds.SIGN_IN_MODAL)
}

function populateLoginForm(formValues) {
  const fields = take(formValues, ['email']);
  return initialize(formIDs.SIGN_IN, fields);
}

function notifyUserPasswordResetSucceeded() {
  return NotificationActions.notify('Your password has been reset', areaIDs.AUTHENTICATION)
}

export function* promptUserLogin(action) {
  try {
    yield put(showLoginModal());
    yield put(populateLoginForm(action.formValues));
    yield put(notifyUserPasswordResetSucceeded());
  } catch (err) {
    yield put(NotificationActions.notifyError(err));
  }
}

export default function* ResetPassword() {
  yield takeLatest(actionTypes.RESET_PASSWORD_SUCCESS, promptUserLogin);
}
