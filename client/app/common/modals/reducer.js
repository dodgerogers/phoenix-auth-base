import { fromJS } from 'immutable';
import { actionTypes } from './modalConstants';

export const initialState = fromJS({
  modals: fromJS({}),
});

export default function modalsReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.SHOW_MODAL:
      return state.set(action.data.id, true);
    case actionTypes.HIDE_MODAL:
      return state.set(action.data.id, false);
    default:
      return state;
  }
}
