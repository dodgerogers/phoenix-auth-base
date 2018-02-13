import mirrorCreator from 'mirror-creator';


export const formIDs = mirrorCreator([
  'SESSION',
  'REGISTRATION',
  'CONFIRMATION',
  'RESEND_CONFIRMATION',
  'FORGOT_PASSWORD',
  'PASSWORD_RESET',
]);

export const actionTypes = mirrorCreator([
  'AUTHENTICATE_SUCCESS',
  'AUTHENTICATE_FAILURE',
  'SIGN_OUT_REQUEST',
  'SIGN_OUT_SUCCESS',
  'SIGN_OUT_FAILURE',
  'VERIFY_TOKEN',
  'VERIFY_TOKEN_SUCCESS',
  'VERIFY_TOKEN_FAILURE',
  'REGISTER_SUCCESS',
  'REGISTER_FAILURE',
  'CONFIRMATION_SUCCESS',
  'CONFIRMATION_FAILURE',
  'RESEND_CONFIRMATION_SUCCESS',
  'RESEND_CONFIRMATION_FAILURE',
  'PASSWORD_RESET_REQUEST_SUCCESS',
  'PASSWORD_RESET_REQUEST_FAILURE',
  'RESET_PASSWORD_SUCCESS',
  'RESET_PASSWORD_FAILURE',
  'REFRESH_TOKEN_REQUEST',
  'REFRESH_TOKEN_SUCCESS',
  'REFRESH_TOKEN_FAILURE',
]);
