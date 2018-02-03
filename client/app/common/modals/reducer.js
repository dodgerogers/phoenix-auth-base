import { fromJS, Map } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({});

export default function modalsReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.SHOW_MODAL:
      return showModal(state, action.data.id);
    case actionTypes.HIDE_MODAL:
      return hideModal(state, action.data.id);
    default:
      return state;
  }
}

function showModal(state, id) {
  return state.merge(hideAllModals(state)).set(id, true);
}

function hideModal(state, id) {
  return state.merge(hideAllModals(state)).set(id, false);
}

function hideAllModals(state) {
  return fromJS(state.keySeq().reduce((memo, key) => {
    memo[key] = false;
    return memo;
  }, {}));
}
