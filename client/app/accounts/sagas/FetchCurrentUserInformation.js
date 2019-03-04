import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { actionTypes } from '../constants';
import * as AccountSources from '../sources';
import * as AccountActions from '../actions';


export function* fetchCurrentUserAndProfiles(action) {
  try {
    const currentUserResponse = yield call(AccountSources.currentUser);
    const profilesResponse = yield call(AccountSources.currentUserProfiles);

    yield put(AccountActions.getCurrentUserSuccess(currentUserResponse.data.user));
    yield put(AccountActions.getCurrentUserProfilesSuccess(profilesResponse.data.profiles));
  } catch (_err) {
    yield put(AccountActions.getCurrentUserFailure());
    yield put(AccountActions.getCurrentUserProfilesFailure());
  }
}

export default function* FetchCurrentUserInformation() {
  yield takeLatest(actionTypes.GET_CURRENT_USER_REQUEST, fetchCurrentUserAndProfiles);
}
