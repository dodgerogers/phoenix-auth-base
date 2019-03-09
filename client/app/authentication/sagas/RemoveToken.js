import { call, put, takeLatest } from 'redux-saga/effects';
import * as TokenStorage from '../services/TokenStorage';
import { actionTypes } from '../constants';
import {
  removeTokenSuccess, removeTokenFailure
} from '../actions';


export function* removeBrowserToken() {
  try {
    yield call(TokenStorage.remove);
    yield put(removeTokenSuccess())
  } catch (err) {
    yield put(removeTokenFailure())
  }
}

export default function* RemoveToken() {
  yield takeLatest(actionTypes.REMOVE_TOKEN_REQUEST, removeBrowserToken);
}
