import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  currentUser: null,
  accessToken: null,
});

export default function authenticationReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.VERIFY_TOKEN:
      return state.set('accessToken', fromJS(action.accessToken));
    case actionTypes.VERIFY_TOKEN_SUCCESS:
      return state.set('currentUser', fromJS(action.user));
    case actionTypes.AUTHENTICATE_FAILURE:
    case actionTypes.VERIFY_TOKEN_FAILURE:
      return state.set('accessToken', null).set('currentUser', null);
    default:
      return state;
  };
}
