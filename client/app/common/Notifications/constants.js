import mirrorCreator from 'mirror-creator';

export const actionTypes = mirrorCreator([
  'CREATE_NOTIFICATION',
  'DESTROY_NOTIFICATION',
]);

export const areaIDs = mirrorCreator([
  'APPLICATION',
  'AUTHENTICATION',
]);
