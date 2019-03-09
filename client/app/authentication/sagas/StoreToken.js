import { call, put, takeLatest } from 'redux-saga/effects';
import * as TokenStorage from '../services/TokenStorage';
import { actionTypes } from '../constants';
import {
  storeTokenSuccess, storeTokenFailure, removeTokenRequest
} from '../actions';


export function* saveInBrowserStorage(action) {
  try {
    const { accessToken } = action;
    yield call(TokenStorage.store, accessToken);
    yield put(storeTokenSuccess(accessToken));
  } catch (err) {
    yield put(storeTokenFailure());
    yield put(removeTokenRequest());
  }
}

export default function* StoreToken() {
  yield takeLatest(actionTypes.STORE_TOKEN_REQUEST, saveInBrowserStorage);
}
