import { all } from 'redux-saga/effects';
import AuthenticateWithStoredToken from '../authentication/sagas/AuthenticateWithStoredToken';
import VerifyAccessToken from '../authentication/sagas/VerifyAccessToken';
import SignOut from '../authentication/sagas/SignOut';
import ForgotPassword from '../authentication/sagas/ForgotPassword';
import ResetPassword from '../authentication/sagas/ResetPassword';
import SessionRefreshTimer from '../authentication/sagas/SessionRefreshTimer';
import RefreshToken from '../authentication/sagas/RefreshToken';

import Test from '../authentication/sagas/ApiTest';

export default function* rootSaga() {
  yield all([
    AuthenticateWithStoredToken(),
    VerifyAccessToken(),
    SignOut(),
    ForgotPassword(),
    ResetPassword(),
    SessionRefreshTimer(),
    RefreshToken(),
    Test(),
  ]);
}
