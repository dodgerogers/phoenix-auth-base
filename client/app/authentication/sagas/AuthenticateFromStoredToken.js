import { call, put, takeLatest } from "redux-saga/effects";
import * as TokenStorage from "../services/TokenStorage";
import { actionTypes } from "../constants";
import { storeTokenRequest, removeTokenRequest } from "../actions";
import { getCurrentAccountRequest } from "../../accounts/actions";

export function* fetchAndVerifyStoredToken() {
  try {
    const accessToken = yield call(TokenStorage.fetch);

    if (accessToken) {
      yield put(storeTokenRequest(accessToken));
      yield put(getCurrentAccountRequest());
    }
  } catch (err) {
    yield put(removeTokenRequest());
  }
}

export default function* AuthenticateFromStoredToken() {
  yield takeLatest(
    actionTypes.AUTHENTICATE_WITH_STORED_TOKEN_REQUEST,
    fetchAndVerifyStoredToken
  );
}
