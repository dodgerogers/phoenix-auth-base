import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  user: null,
});

export default function authenticationReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.AUTHENTICATE_SUCCESS:
      return state.set('user', fromJS(action.user));
    case actionTypes.AUTHENTICATE_FAILURE:
      return state.set('user', null);
    default:
      return state;
  };
}
