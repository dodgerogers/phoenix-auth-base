import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  currentUser: null,
  accessToken: null,
  refreshing: false,
});

export default function authenticationReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.VERIFY_TOKEN:
    case actionTypes.SET_TOKEN:
      return state.set('accessToken', fromJS(action.accessToken));
    case actionTypes.VERIFY_TOKEN_SUCCESS:
      return state.set('currentUser', fromJS(action.user));
    case actionTypes.AUTHENTICATE_FAILURE:
    case actionTypes.VERIFY_TOKEN_FAILURE:
    case actionTypes.SIGN_OUT_SUCCESS:
      return state.set('accessToken', null).set('currentUser', null);
    case actionTypes.REFRESH_TOKEN_REQUEST:
      return state.set('refreshing', true);
    case actionTypes.REFRESH_TOKEN_SUCCESS:
    case actionTypes.REFRESH_TOKEN_FAILURE:
      return state.set('refreshing', false);    
    default:
      return state;
  };
}
