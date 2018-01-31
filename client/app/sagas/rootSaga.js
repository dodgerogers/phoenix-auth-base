import { all } from 'redux-saga/effects';
import AuthenticateSaga from '../authentication/sagas/AuthenticateSaga';
import SignOutSaga from '../authentication/sagas/SignOutSaga';
import ForgotPasswordSaga from '../authentication/sagas/ForgotPasswordSaga';

export default function* rootSaga() {
  yield all([
    AuthenticateSaga(),
    SignOutSaga(),
    ForgotPasswordSaga(),
  ]);
}
