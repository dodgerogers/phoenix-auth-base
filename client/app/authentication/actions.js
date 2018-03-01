import { initialize } from 'redux-form/immutable';
import * as AuthenticationSources from './sources';
import { ModalActions, ModalIds } from '../common/modals';
import { actionTypes } from './constants';
import { NotificationActions, areaIDs } from '../common/Notifications';
import * as TokenStorage from './services/TokenStorage';
import { formIDs } from './constants';
import handleFormErrors from '../lib/utils/handleFormErrors';

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

export const signInSuccess = response => ({
  type: actionTypes.SIGN_IN_SUCCESS,
  accessToken: response.data.accessToken,
});

export const registerSuccess = (_result, _dispatch, { values }) => ({
  type: actionTypes.REGISTER_SUCCESS,
  formValues: values,
});

export const registerFailure = error => ({
  type: actionTypes.REGISTER_FAILURE,
  error,
});

export const confirmationSuccess = response => ({
  type: actionTypes.CONFIRMATION_SUCCESS,
  accessToken: response.data.accessToken,
});

export const confirmationFailure = (error) => ({
  type: actionTypes.CONFIRMATION_FAILURE,
  error,
});

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
        handleFormErrors(err.response.data.error);
      });
  }
};

export const passwordResetRequestSuccess = (_result, _dispatch, { values }) => ({
  type: actionTypes.PASSWORD_RESET_REQUEST_SUCCESS,
  formValues: values,
});

export const resetPasswordSuccess = (_result, _dispatch, { values }) => ({
  type: actionTypes.RESET_PASSWORD_SUCCESS,
  formValues: values,
});
