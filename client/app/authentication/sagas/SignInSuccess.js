import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { initialize } from 'redux-form/immutable';
import { NotificationActions, areaIDs } from '../../common/Notifications';
import { ModalActions, ModalIds } from '../../common/modals';
import { actionTypes } from '../constants';
import { verifyTokenRequest, authenticateFailure } from '../actions';


function hideSignInModal() {
  return ModalActions.hideModal(ModalIds.SIGN_IN_MODAL)
}

function notifyUserSignInWasSuccessful() {
  return NotificationActions.notify('Logged in successfully')
}

export function* handleSignInSuccess(action) {
  try {
    yield put(verifyTokenRequest(action.accessToken));
    yield put(hideSignInModal());
    yield put(notifyUserSignInWasSuccessful());
  } catch (err) {
    yield put(dispatch(authenticateFailure(err)));
    yield put(NotificationActions.notifyError(err));
  }
}

export default function* SignInSuccess() {
  yield takeLatest(actionTypes.SIGN_IN_SUCCESS, handleSignInSuccess);
}
