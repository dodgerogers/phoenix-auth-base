import { actionTypes } from "./constants";

export const getCurrentAccountRequest = () => ({
  type: actionTypes.GET_CURRENT_ACCOUNT_REQUEST,
});

export const removeCurrentAccountRequest = () => ({
  type: actionTypes.REMOVE_CURRENT_ACCOUNT_REQUEST,
});

export const getCurrentUserRequest = () => ({
  type: actionTypes.GET_CURRENT_USER_REQUEST,
});

export const getCurrentUserSuccess = (user) => ({
  type: actionTypes.GET_CURRENT_USER_SUCCESS,
  user,
});

export const getCurrentUserFailure = () => ({
  type: actionTypes.GET_CURRENT_USER_FAILURE,
});

export const getCurrentUserProfilesRequest = () => ({
  type: actionTypes.GET_CURRENT_USER_PROFILES_REQUEST,
});

export const getCurrentUserProfilesSuccess = (profiles) => ({
  type: actionTypes.GET_CURRENT_USER_PROFILES_SUCCESS,
  profiles,
});

export const getCurrentUserProfilesFailure = () => ({
  type: actionTypes.GET_CURRENT_USER_PROFILES_FAILURE,
});

export const setCurrentUserProfile = (profileId) => ({
  type: actionTypes.SET_CURRENT_USER_PROFILE,
  profileId,
});
