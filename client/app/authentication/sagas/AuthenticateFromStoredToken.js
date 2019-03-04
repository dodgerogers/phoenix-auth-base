import { call, put, takeLatest } from 'redux-saga/effects'
import * as TokenStorage from '../services/TokenStorage';
import { actionTypes } from '../constants';
import { authenticateFailure } from '../actions';
import * as AccountActions from '../../accounts/actions';


export function* fetchAndVerifyStoredToken() {
  try {
    const accessToken = yield call(TokenStorage.fetch);

    yield put(AccountActions.getCurrentUserRequest(accessToken));
  } catch (err) {
    yield put(authenticateFailure());
  }
}

export default function* AuthenticateFromStoredToken() {
  yield takeLatest(actionTypes.AUTHENTICATE_WITH_STORED_TOKEN_REQUEST, fetchAndVerifyStoredToken);
}
