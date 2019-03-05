import { call, put, takeLatest, select } from 'redux-saga/effects'
import { initialize } from 'redux-form/immutable';
import { NotificationActions, areaIDs } from '../../common/Notifications';
import { ModalActions, ModalIds } from '../../common/modals';
import { actionTypes, formIDs } from '../constants';
import { take } from '../../lib/utils/MapHelper';
import { confirmationFailure } from '../actions';
import { getCurrentUserRequest } from '../../accounts/actions';


function hideConfirmationModal() {
  return ModalActions.hideModal(ModalIds.CONFIRMATION_MODAL)
}

function notifyConfirmationSuccess() {
  return NotificationActions.notify('Account successfully confirmed! You are now logged in')
}

export function* getCurrentUserAndNotifyUser(action) {
  try {
    yield put(getCurrentUserRequest());
    yield put(hideConfirmationModal());
    yield put(notifyConfirmationSuccess());
  } catch (err) {
    yield put(confirmationFailure(err));
    yield put(NotificationActions.notifyError(err));
  }
}

export default function* ConfirmationSuccess() {
  yield takeLatest(actionTypes.CONFIRMATION_SUCCESS, getCurrentUserAndNotifyUser);
}
