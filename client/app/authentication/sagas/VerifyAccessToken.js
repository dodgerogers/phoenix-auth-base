import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { actionTypes } from '../constants';
import * as AccountSources from '../../accounts/sources';
import * as AccountActions from '../../accounts/actions';
import * as TokenStorage from '../services/TokenStorage';


export function* storeTokenAndFetchCurrentUser(action) {
  try {
    const currentUserResponse = yield call(AccountSources.currentUser);
    const profilesResponse = yield call(AccountSources.currentUserProfiles);
    const tokenCookie = yield call(TokenStorage.store, action.accessToken);

    yield put(AccountActions.getCurrentUserSuccess(currentUserResponse.data));
    yield put(AccountActions.getCurrentUserProfilesSuccess(profilesResponse.data.profiles));
  } catch (_err) {
    yield call(TokenStorage.remove);
    yield put(AccountActions.getCurrentUserFailure());
    yield put(AccountActions.getCurrentUserProfilesFailure());
  }
}

export default function* VerifyAccessToken() {
  yield takeLatest(actionTypes.VERIFY_TOKEN_REQUEST, storeTokenAndFetchCurrentUser);
}
