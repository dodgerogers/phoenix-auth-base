import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { initialize } from 'redux-form/immutable';
import { NotificationActions, areaIDs } from '../../common/Notifications';
import { ModalActions, ModalIds } from '../../common/modals';
import * as TokenStorage from '../services/TokenStorage';
import * as AccountActions from '../../accounts/actions';
import { authenticateFailure } from '../actions';
import { actionTypes } from '../constants';


function hideSignInModal() {
  return ModalActions.hideModal(ModalIds.SIGN_IN_MODAL)
}

function notifyUserSignInWasSuccessful() {
  return NotificationActions.notify('Logged in successfully')
}

export function* handleSignInSuccess(action) {
  try {
    const accessToken = action.accessToken;

    yield call(TokenStorage.store, accessToken);
    yield put(AccountActions.getCurrentUserRequest());
    yield put(hideSignInModal());
    yield put(notifyUserSignInWasSuccessful());
  } catch (err) {
    console.log(err);
    yield call(TokenStorage.remove);
    yield put(authenticateFailure(err));
    yield put(NotificationActions.notifyError(err));
  }
}

export default function* SignInSuccess() {
  yield takeLatest(actionTypes.SIGN_IN_SUCCESS, handleSignInSuccess);
}
