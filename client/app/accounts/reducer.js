import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({
  currentUser: null,
  currentProfile: null,
  userProfiles: [],
});

export default function accountsReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.GET_CURRENT_USER_SUCCESS:
      return state.set('currentUser', fromJS(action.user));
    case actionTypes.GET_CURRENT_USER_PROFILES_SUCCESS:
      return state.set('userProfiles', fromJS(action.profiles));
    case actionTypes.SET_CURRENT_USER_PROFILE:
      const profile = state.userProfiles.find(p => p.id === action.profileId);
      return state.set('currentProfile', profile);
    case actionTypes.GET_CURRENT_USER_FAILURE:
      return state.set('currentUser', initialState.get('currentUser'));
    case actionTypes.GET_CURRENT_USER_PROFILES_FAILURE:
      return state.set('userProfiles', initialState.get('userProfiles'));
    default:
      return state;
  };
}
