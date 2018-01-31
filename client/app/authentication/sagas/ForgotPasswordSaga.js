import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { NotificationActions, areaIDs } from '../../common/Notifications';
import { ModalActions, ModalIds } from '../../common/modals';
import { actionTypes } from '../constants';


export function* handleForgotPasswordRequest(action) {
  try {
    yield put(ModalActions.hideModal(ModalIds.FORGOT_PASSWORD_MODAL))
    yield put(ModalActions.showModal(ModalIds.RESET_PASSWORD_MODAL))
    yield put(NotificationActions.notify('A password reset code has been sent', areaIDs.AUTHENTICATION));
  } catch (err) {
    yield put(NotificationActions.notifyError(err));
  }
}

export function* ForgotPasswordSaga() {
  yield takeLatest(actionTypes.PASSWORD_RESET_REQUEST_SUCCESS, handleForgotPasswordRequest);
}

export default ForgotPasswordSaga;
