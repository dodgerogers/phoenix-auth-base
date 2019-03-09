import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  accessToken: null,
  refreshing: false,
});

export default function authenticationReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.STORE_TOKEN_SUCCESS:
      return state.set('accessToken', fromJS(action.accessToken));
    case actionTypes.STORE_TOKEN_FAILURE:
    case actionTypes.REMOVE_TOKEN_SUCCESS:
      return state.set('accessToken', initialState.get('accessToken'));
    case actionTypes.REFRESH_TOKEN_REQUEST:
      return state.set('refreshing', true);
    case actionTypes.REFRESH_TOKEN_SUCCESS:
    case actionTypes.REFRESH_TOKEN_FAILURE:
      return state.set('refreshing', false);
      return state.set('refreshing', false);
    default:
      return state;
  };
}
