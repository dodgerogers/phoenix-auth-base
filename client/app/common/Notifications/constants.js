import mirrorCreator from 'mirror-creator';

export const actionTypes = mirrorCreator([
  'NOTIFY_SUCCESS',
  'NOTIFY_FAILURE',
  'DESTROY',
]);

export const areaIDs = mirrorCreator([
  'APPLICATION',
  'AUTHENTICATION',
]);
