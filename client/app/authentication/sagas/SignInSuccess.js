import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { initialize } from 'redux-form/immutable';
import { NotificationActions, areaIDs } from '../../common/Notifications';
import { ModalActions, ModalIds } from '../../common/modals';
import { getCurrentAccountRequest } from '../../accounts/actions';
import { storeTokenRequest } from '../actions';
import { actionTypes } from '../constants';


function hideSignInModal() {
  return ModalActions.hideModal(ModalIds.SIGN_IN_MODAL)
}

function notifyUserSignInWasSuccessful() {
  return NotificationActions.notify('Logged in successfully')
}

export function* handleSignInSuccess(action) {
  try {
    yield put(storeTokenRequest(action.accessToken));
    yield put(getCurrentAccountRequest());
    yield put(hideSignInModal());
    yield put(notifyUserSignInWasSuccessful());
  } catch (err) {
    yield put(NotificationActions.notifyError(err));
  }
}

export default function* SignInSuccess() {
  yield takeLatest(actionTypes.SIGN_IN_SUCCESS, handleSignInSuccess);
}
