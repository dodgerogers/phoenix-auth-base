import mirrorCreator from 'mirror-creator';

export const formIDs = mirrorCreator([
  'SESSION',
  'REGISTRATION',
]);

export const actionTypes = mirrorCreator([
  'AUTHENTICATE_SUCCESS',
  'AUTHENTICATE_FAILURE',
]);
