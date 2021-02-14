import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { actionTypes } from "../constants";
import * as AccountSources from "../sources";
import * as SelectedProfileStorage from "../services/SelectedProfileStorage";
import {
  getCurrentUserSuccess,
  getCurrentUserProfilesSuccess,
  setCurrentUserProfile,
  getCurrentUserFailure,
  getCurrentUserProfilesFailure,
} from "../actions";

export function* fetchCurrentUserAndProfiles(action) {
  try {
    const currentUserResponse = yield call(AccountSources.currentUser);

    yield put(getCurrentUserSuccess(currentUserResponse.data.user));

    const profilesResponse = yield call(AccountSources.currentUserProfiles);
    let profileID = yield call(SelectedProfileStorage.fetch);

    yield put(getCurrentUserProfilesSuccess(profilesResponse.data.profiles));

    if (!profileID || profileID === null || profileID === undefined) {
      profileID = profilesResponse.data.profiles[0].id;
      yield call(SelectedProfileStorage.store, profileID);
    }

    yield put(setCurrentUserProfile(profileID));
  } catch (_err) {
    yield put(getCurrentUserFailure());
    yield put(getCurrentUserProfilesFailure());
  }
}

export default function* FetchCurrentUserInformation() {
  yield takeLatest(
    actionTypes.GET_CURRENT_ACCOUNT_REQUEST,
    fetchCurrentUserAndProfiles
  );
}
