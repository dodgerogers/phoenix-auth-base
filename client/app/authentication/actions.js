import { actionTypes } from './constants';

export const storeTokenRequest = (accessToken) => ({
  type: actionTypes.STORE_TOKEN_REQUEST,
  accessToken
});

export const storeTokenSuccess = (accessToken) => ({
  type: actionTypes.STORE_TOKEN_SUCCESS,
  accessToken
});

export const storeTokenFailure = () => ({
  type: actionTypes.STORE_TOKEN_FAILURE,
});

export const removeTokenRequest = () => ({
  type: actionTypes.REMOVE_TOKEN_REQUEST
});

export const removeTokenSuccess = () => ({
  type: actionTypes.REMOVE_TOKEN_SUCCESS
});

export const removeTokenFailure = () => ({
  type: actionTypes.REMOVE_TOKEN_FAILURE,
});

export const refreshTokenRequest = () => ({
  type: actionTypes.REFRESH_TOKEN_REQUEST
});

export const refreshTokenSuccess = accessToken => ({
  type: actionTypes.REFRESH_TOKEN_SUCCESS,
  accessToken
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

export const signInSuccess = accessToken => ({
  type: actionTypes.SIGN_IN_SUCCESS,
  accessToken,
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

export const resendConfirmationSuccess = (_result, _dispatch, { values }) => ({
  type: actionTypes.RESEND_CONFIRMATION_SUCCESS,
  formValues: values,
});

export const resendConfirmationFailure = (error) => ({
  type: actionTypes.RESEND_CONFIRMATION_FAILURE,
  error,
});

export const passwordResetRequestSuccess = (_result, _dispatch, { values }) => ({
  type: actionTypes.PASSWORD_RESET_REQUEST_SUCCESS,
  formValues: values,
});

export const resetPasswordSuccess = (_result, _dispatch, { values }) => ({
  type: actionTypes.RESET_PASSWORD_SUCCESS,
  formValues: values,
});
