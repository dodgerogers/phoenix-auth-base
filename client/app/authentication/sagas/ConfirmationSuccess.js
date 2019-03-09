import { call, put, takeLatest, select } from 'redux-saga/effects'
import { initialize } from 'redux-form/immutable';
import { NotificationActions, areaIDs } from '../../common/Notifications';
import { ModalActions, ModalIds } from '../../common/modals';
import * as TokenStorage from '../services/TokenStorage';
import { actionTypes, formIDs } from '../constants';
import { take } from '../../lib/utils/MapHelper';
import { confirmationFailure, refreshTokenSuccess } from '../actions';
import { storeTokenRequest, getCurrentAccountRequest } from '../../accounts/actions';


function hideConfirmationModal() {
  return ModalActions.hideModal(ModalIds.CONFIRMATION_MODAL)
}

function notifyConfirmationSuccess() {
  return NotificationActions.notify('Account successfully confirmed! You are now logged in')
}

export function* getCurrentUserAndNotifyUser(action) {
  try {
    yield put(storeTokenRequest(action.accessToken));
    yield put(getCurrentAccountRequest());
    yield put(hideConfirmationModal());
    yield put(notifyConfirmationSuccess());
  } catch (err) {
    yield put(NotificationActions.notifyError(err));
  }
}

export default function* ConfirmationSuccess() {
  yield takeLatest(actionTypes.CONFIRMATION_SUCCESS, getCurrentUserAndNotifyUser);
}
