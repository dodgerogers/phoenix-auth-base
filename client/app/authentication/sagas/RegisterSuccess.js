import { call, put, takeLatest } from 'redux-saga/effects'
import { initialize } from 'redux-form/immutable';
import { NotificationActions, areaIDs } from '../../common/Notifications';
import { ModalActions, ModalIds } from '../../common/modals';
import { actionTypes, formIDs } from '../constants';
import { registerFailure } from '../actions';
import { take } from '../../lib/utils/MapHelper';


function notifyUserRegistrationSuccess() {
  return NotificationActions.notify('An email confirmation has been sent', areaIDs.AUTHENTICATION);
}

function showConfirmationModal() {
  return ModalActions.showModal(ModalIds.CONFIRMATION_MODAL);
}

function initializeConfirmationForm(formValues) {
  const fields = take(formValues, ['email', 'password']);
  return initialize(formIDs.CONFIRMATION, fields);
}

export function* handleRegisterSuccess(action) {
  try {
    yield put(notifyUserRegistrationSuccess());
    yield put(showConfirmationModal());
    yield put(initializeConfirmationForm(action.formValues));
  } catch (err) {
    yield put(registerFailure(err));
  }
}

export default function* RegisterSuccess() {
  yield takeLatest(actionTypes.REGISTER_SUCCESS, handleRegisterSuccess);
}
