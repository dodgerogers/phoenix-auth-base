import { all } from 'redux-saga/effects';
import VerifyAccessToken from '../authentication/sagas/VerifyAccessToken';
import SignOut from '../authentication/sagas/SignOut';
import ForgotPassword from '../authentication/sagas/ForgotPassword';
import ResetPassword from '../authentication/sagas/ResetPassword';
import SessionRefreshTimer from '../authentication/sagas/SessionRefreshTimer';
import RefreshToken from '../authentication/sagas/RefreshToken';
import AuthenticateFromCookie from '../authentication/sagas/AuthenticateFromCookie';
import SignInSuccess from '../authentication/sagas/SignInSuccess';
import RegisterSuccess from '../authentication/sagas/RegisterSuccess';
import ConfirmationSuccess from '../authentication/sagas/ConfirmationSuccess';


export default function* rootSaga() {
  yield all([
    AuthenticateFromCookie(),
    VerifyAccessToken(),
    SignOut(),
    ForgotPassword(),
    ResetPassword(),
    SessionRefreshTimer(),
    RefreshToken(),
    SignInSuccess(),
    RegisterSuccess(),
    ConfirmationSuccess(),
  ]);
}
