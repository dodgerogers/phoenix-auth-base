import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { initialize } from 'redux-form/immutable';
import { NotificationActions, areaIDs } from '../../common/Notifications';
import { ModalActions, ModalIds } from '../../common/modals';
import { actionTypes, formIDs } from '../constants';
import { take } from '../../lib/utils/MapHelper';

function showConfirmationModal() {
  return ModalActions.showModal(ModalIds.CONFIRMATION_MODAL)
}

function populateConfirmationForm(formValues) {
  const fields = take(formValues, ['email']);
  return initialize(formIDs.CONFIRMATION, fields);
}

function notifyUserConfirmationEmailHasBeenSent() {
  return NotificationActions.notify('If an account exists we have sent a confirmation code', areaIDs.AUTHENTICATION)
}

export function* promptUserConfirmation(action) {
  try {
    yield put(showConfirmationModal());
    yield put(populateConfirmationForm(action.formValues));
    yield put(notifyUserConfirmationEmailHasBeenSent());
  } catch (err) {
    yield put(NotificationActions.notifyError(err));
  }
}

export default function* ResendPasswordSuccess() {
  yield takeLatest(actionTypes.RESEND_CONFIRMATION_SUCCESS, promptUserConfirmation);
}
