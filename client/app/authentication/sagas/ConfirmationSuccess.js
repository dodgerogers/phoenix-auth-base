import { put, takeLatest } from "redux-saga/effects";
import { NotificationActions } from "../../common/Notifications";
import { ModalActions, ModalIds } from "../../common/modals";
import { actionTypes } from "../constants";
import { getCurrentAccountRequest } from "../../accounts/actions";
import { storeTokenRequest } from "../actions";

function hideConfirmationModal() {
  return ModalActions.hideModal(ModalIds.CONFIRMATION_MODAL);
}

function notifyConfirmationSuccess() {
  return NotificationActions.notify(
    "Account successfully confirmed! You are now logged in"
  );
}

export function* getCurrentUserAndNotify(action) {
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
  yield takeLatest(actionTypes.CONFIRMATION_SUCCESS, getCurrentUserAndNotify);
}
