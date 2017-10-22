import mirrorCreator from 'mirror-creator';

export const actionTypes = mirrorCreator([
  'INITIALIZE_MODAL',
  'SHOW_MODAL',
  'HIDE_MODAL',
]);

export const modalIds = mirrorCreator([
  'loginModal',
  'registrationModal',
])
