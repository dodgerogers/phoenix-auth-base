import mirrorCreator from 'mirror-creator';

export const actionTypes = mirrorCreator([
  'NOTIFY',
  'DESTROY',
]);

export const areaIDs = mirrorCreator([
  'APPLICATION',
  'AUTHENTICATION',
]);
