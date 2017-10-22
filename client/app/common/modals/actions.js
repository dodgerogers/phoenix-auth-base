import { actionTypes } from './constants';

export function showModal(id) {
  return {
    type: actionTypes.SHOW_MODAL,
    data: { id },
  };
}

export function hideModal(id) {
  return {
    type: actionTypes.HIDE_MODAL,
    data: { id },
  };
}
