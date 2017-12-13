import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  currentUser: null,
  accessToken: null,
});

export default function authenticationReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.AUTHENTICATE_SUCCESS:
      return state.set('accessToken', fromJS(action.accessToken));
    case actionTypes.AUTHENTICATE_FAILURE:
      return state.set('accessToken', null);
    case actionTypes.GET_CURRENT_RESOURCE_SUCCESS:
      return state.set('currentUser', fromJS(action.user));
    case actionTypes.GET_CURRENT_RESOURCE_FAILURE:
      return state.set('currentUser', null);
    default:
      return state;
  };
}
