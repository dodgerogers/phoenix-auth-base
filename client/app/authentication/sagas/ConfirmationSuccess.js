import { call, put, takeLatest, select } from 'redux-saga/effects'
import { initialize } from 'redux-form/immutable';
import { NotificationActions, areaIDs } from '../../common/Notifications';
import { ModalActions, ModalIds } from '../../common/modals';
import { actionTypes, formIDs } from '../constants';
import { take } from '../../lib/utils/MapHelper';
import { verifyTokenRequest, confirmationFailure } from '../actions';


function hideConfirmationModal() {
  return ModalActions.hideModal(ModalIds.CONFIRMATION_MODAL)
}

function notifyConfirmationSuccess() {
  return NotificationActions.notify('Account successfully confirmed! You are now logged in')
}

export function* verifyTokenAndNotifyUser(action) {
  try {
    yield put(verifyTokenRequest(action.accessToken));
    yield put(hideConfirmationModal());
    yield put(notifyConfirmationSuccess());
  } catch (err) {
    yield put(confirmationFailure(err));
    yield put(NotificationActions.notifyError(err));
  }
}

export default function* ConfirmationSuccess() {
  yield takeLatest(actionTypes.CONFIRMATION_SUCCESS, verifyTokenAndNotifyUser);
}
