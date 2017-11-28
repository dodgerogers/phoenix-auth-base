import { stopAsyncValidation, SubmissionError } from 'redux-form/immutable';
import * as AuthenticationSources from './sources';
import { ModalActions, ModalIds } from '../common/modals';
import { actionTypes, formIDs } from './constants';
import { NotificationActions, areaIDs } from '../common/Notifications';

const authenticateSuccess = (user) => ({
  type: actionTypes.AUTHENTICATE_SUCCESS,
  user,
});

const authenticateFailure = (error) => ({
  type: actionTypes.AUTHENTICATE_FAILURE,
  error,
});

export function login(loginParams) {
  return dispatch => {
    return AuthenticationSources.login(loginParams.toJS())
      .then(response => {
        dispatch(authenticateSuccess(response.data));
        dispatch(ModalActions.hideModal(ModalIds.LOGIN_MODAL));
      })
      .catch(err => {
        dispatch(authenticateFailure(err.response.data.error))
        throw new SubmissionError({ _error: err.response.data.error });
      });
  };
}

const registerSuccess = (user) => ({
  type: actionTypes.REGISTER_SUCCESS,
  user,
});

const registerFailure = (error) => ({
  type: actionTypes.REGISTER_FAILURE,
  error,
});

export function register(registerParams) {
  return dispatch => {
    return AuthenticationSources.register(registerParams.toJS())
      .then(response => {
        dispatch(registerSuccess(response.data));
        dispatch(NotificationActions.notify(response.data.message, areaIDs.AUTHENTICATION))
        dispatch(ModalActions.showModal(ModalIds.CONFIRMATION_MODAL));
      })
      .catch(err => {
        dispatch(registerFailure(err.response.data.error));
        throw new SubmissionError(err.response.data.error);
      });
  };
}

const confirmationSuccess = (user) => ({
  type: actionTypes.CONFIRMATION_SUCCESS,
  user,
});

const confirmationFailure = (error) => ({
  type: actionTypes.CONFIRMATION_FAILURE,
  error,
});

export function confirm(confirmationParams) {
  return dispatch => {
    return AuthenticationSources.confirm(confirmationParams.toJS())
      .then(response => {
        dispatch(confirmationSuccess(response.data));
        dispatch(NotificationActions.notify(response.data.message))
        dispatch(ModalActions.hideModal(ModalIds.CONFIRMATION_MODAL));
      })
      .catch(err => {
        dispatch(confirmationFailure(err.response.data.error));
        throw new SubmissionError({ _error: err.response.data.error });
      });
  }
}

const resendConfirmationSuccess = (user) => ({
  type: actionTypes.RESEND_CONFIRMATION_SUCCESS,
  user,
});

const resendConfirmationFailure = (error) => ({
  type: actionTypes.RESEND_CONFIRMATION_FAILURE,
  error,
});

export function resendConfirmation(resendConfirmation) {
  return dispatch => {
    return AuthenticationSources.resendConfirmation(resendConfirmation.toJS())
      .then(response => {
        dispatch(NotificationActions.notify(response.data.message, areaIDs.AUTHENTICATION))
        dispatch(ModalActions.showModal(ModalIds.CONFIRMATION_MODAL));
      })
      .catch(err => {
        dispatch(resendConfirmationFailure(err.response.data.error));
        throw new SubmissionError({ _error: err.response.data.error });
      });
  }
}
