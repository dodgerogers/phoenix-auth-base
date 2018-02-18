import { stopAsyncValidation, SubmissionError, initialize } from 'redux-form/immutable';
import * as AuthenticationSources from './sources';
import { ModalActions, ModalIds } from '../common/modals';
import { actionTypes } from './constants';
import { NotificationActions, areaIDs } from '../common/Notifications';
import * as TokenStorage from './services/TokenStorage';
import { formIDs } from './constants';

// TODO's
// * Move notifications to a separate file
// * Move all thunks to sagas

export const verifyTokenRequest = accessToken => ({
  type: actionTypes.VERIFY_TOKEN_REQUEST,
  accessToken,
});

export const verifyTokenSuccess = user => ({
  type: actionTypes.VERIFY_TOKEN_SUCCESS,
  user,
});

export const verifyTokenFailure = () => ({
  type: actionTypes.VERIFY_TOKEN_FAILURE,
});

export const refreshTokenRequest = () => ({
  type: actionTypes.REFRESH_TOKEN_REQUEST,
});

export const refreshTokenSuccess = () => ({
  type: actionTypes.REFRESH_TOKEN_SUCCESS,
});

export const refreshTokenFailure = () => ({
  type: actionTypes.REFRESH_TOKEN_FAILURE,
});

export const refreshTokenRequestCancelled = () => ({
  type: actionTypes.REFRESH_TOKEN_REQUEST_CANCELLED,
});

export const authenticateWithStoredToken = () => ({
  type: actionTypes.AUTHENTICATE_WITH_STORED_TOKEN_REQUEST,
});

export const authenticateFailure = error => ({
  type: actionTypes.AUTHENTICATE_FAILURE,
  error,
});

export const signOutRequest = () => ({
  type: actionTypes.SIGN_OUT_REQUEST,
});

export const signOutSuccess = () => ({
  type: actionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = () => ({
  type: actionTypes.SIGN_OUT_FAILURE,
});

export function login(loginParams) {
  return dispatch => {
    return AuthenticationSources.login(loginParams.toJS())
      .then(response => {
        dispatch(verifyTokenRequest(response.data.accessToken))
        dispatch(NotificationActions.notify('Logged in successfully'))
        dispatch(ModalActions.hideModal(ModalIds.LOGIN_MODAL))
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
        dispatch(NotificationActions.notify('An email confirmation has been sent', areaIDs.AUTHENTICATION))
        dispatch(ModalActions.showModal(ModalIds.CONFIRMATION_MODAL))
        dispatch(initialize(formIDs.CONFIRMATION, registerParams));
      })
      .catch(err => {
        dispatch(registerFailure(err.response.data.error));
        throw new SubmissionError(err.response.data.error);
      });
  };
}

const confirmationSuccess = () => ({
  type: actionTypes.CONFIRMATION_SUCCESS,
});

const confirmationFailure = (error) => ({
  type: actionTypes.CONFIRMATION_FAILURE,
  error,
});

export function confirm(confirmationParams) {
  return dispatch => {
    return AuthenticationSources.confirm(confirmationParams.toJS())
      .then(response => {
        dispatch(verifyTokenRequest(response.data.accessToken));
        dispatch(confirmationSuccess());
        dispatch(NotificationActions.notify('Account successfully confirmed! You are now logged in'));
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
        dispatch(NotificationActions.notify('If an account exists we have sent a confirmation code', areaIDs.AUTHENTICATION))
        dispatch(ModalActions.showModal(ModalIds.CONFIRMATION_MODAL));
        dispatch(initialize(formIDs.CONFIRMATION, resendConfirmation));
      })
      .catch(err => {
        dispatch(resendConfirmationFailure(err.response.data.error));
        throw new SubmissionError({ _error: err.response.data.error });
      });
  }
};

export const passwordResetRequestSuccess = (result, dispatch, { values }) => ({
  type: actionTypes.PASSWORD_RESET_REQUEST_SUCCESS,
  data: { formValues: values },
});

export const resetPasswordSuccess = (result, dispatch, { values }) => ({
  type: actionTypes.RESET_PASSWORD_SUCCESS,
  data: { formValues: values },
});
