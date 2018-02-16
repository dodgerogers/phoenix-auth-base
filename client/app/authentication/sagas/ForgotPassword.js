import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { initialize } from 'redux-form/immutable';
import { NotificationActions, areaIDs } from '../../common/Notifications';
import { ModalActions, ModalIds } from '../../common/modals';
import { actionTypes, formIDs } from '../constants';
import { take } from '../../lib/utils/MapHelper';


function showPasswordResetModal() {
  return ModalActions.showModal(ModalIds.RESET_PASSWORD_MODAL)
}

function populatePasswordResetForm(formValues) {
  const fields = take(formValues, ['email']);
  return initialize(formIDs.PASSWORD_RESET, fields);
}

function notifyUserResetHasBeenSent() {
  return NotificationActions.notify('A password reset code has been sent', areaIDs.AUTHENTICATION)
}

export function* handleForgotPasswordRequest(action) {
  try {
    yield put(showPasswordResetModal());
    yield put(populatePasswordResetForm(action.data.formValues));
    yield put(notifyUserResetHasBeenSent());
  } catch (err) {
    yield put(NotificationActions.notifyError(err));
  }
}

export function* ForgotPassword() {
  yield takeLatest(actionTypes.PASSWORD_RESET_REQUEST_SUCCESS, handleForgotPasswordRequest);
}

export default ForgotPassword;
