import mirrorCreator from 'mirror-creator';

export const formIDs = mirrorCreator([
  'SESSION',
  'REGISTRATION',
  'CONFIRMATION',
]);

export const actionTypes = mirrorCreator([
  'AUTHENTICATE_SUCCESS',
  'AUTHENTICATE_FAILURE',
  'REGISTER_SUCCESS',
  'REGISTER_FAILURE',
  'CONFIRMATION_SUCCESS',
  'CONFIRMATION_FAILURE',
]);
