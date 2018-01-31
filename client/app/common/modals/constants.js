import mirrorCreator from 'mirror-creator';

export const actionTypes = mirrorCreator([
  'INITIALIZE_MODAL',
  'SHOW_MODAL',
  'HIDE_MODAL',
]);

export const modalIds = mirrorCreator([
  'LOGIN_MODAL',
  'REGISTRATION_MODAL',
  'CONFIRMATION_MODAL',
  'RESEND_CONFIRMATION_MODAL',
  'FORGOT_PASSWORD_MODAL',
  'RESET_PASSWORD_MODAL',
])
