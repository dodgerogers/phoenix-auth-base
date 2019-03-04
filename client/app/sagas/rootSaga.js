import { all } from 'redux-saga/effects';
import SignOut from '../authentication/sagas/SignOut';
import ForgotPassword from '../authentication/sagas/ForgotPassword';
import ResetPassword from '../authentication/sagas/ResetPassword';
import SessionRefreshTimer from '../authentication/sagas/SessionRefreshTimer';
import RefreshToken from '../authentication/sagas/RefreshToken';
import AuthenticateFromStoredToken from '../authentication/sagas/AuthenticateFromStoredToken';
import SignInSuccess from '../authentication/sagas/SignInSuccess';
import RegisterSuccess from '../authentication/sagas/RegisterSuccess';
import ConfirmationSuccess from '../authentication/sagas/ConfirmationSuccess';
import ResendConfirmationSuccess from '../authentication/sagas/ResendConfirmationSuccess';
import FetchCurrentUserInformation from '../accounts/sagas/FetchCurrentUserInformation';


export default function* rootSaga() {
  yield all([
    AuthenticateFromStoredToken(),
    SignOut(),
    ForgotPassword(),
    ResetPassword(),
    SessionRefreshTimer(),
    RefreshToken(),
    SignInSuccess(),
    RegisterSuccess(),
    ConfirmationSuccess(),
    ResendConfirmationSuccess(),
    FetchCurrentUserInformation(),
  ]);
}
