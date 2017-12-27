import { all } from 'redux-saga/effects';
import AuthenticateSaga from '../authentication/sagas/AuthenticateSaga';
import SignOutSaga from '../authentication/sagas/SignOutSaga';

export default function* rootSaga() {
  yield all([
    AuthenticateSaga(),
    SignOutSaga(),
  ]);
}
