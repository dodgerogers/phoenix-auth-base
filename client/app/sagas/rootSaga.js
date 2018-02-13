import { all } from 'redux-saga/effects';
import AuthenticateSaga from '../authentication/sagas/AuthenticateSaga';
import SignOutSaga from '../authentication/sagas/SignOutSaga';
import ForgotPasswordSaga from '../authentication/sagas/ForgotPasswordSaga';
import ResetPasswordSaga from '../authentication/sagas/ResetPasswordSaga';
import RefreshTokenSaga from '../authentication/sagas/RefreshTokenSaga';

export default function* rootSaga() {
  yield all([
    AuthenticateSaga(),
    SignOutSaga(),
    ForgotPasswordSaga(),
    ResetPasswordSaga(),
    RefreshTokenSaga(),
  ]);
}
