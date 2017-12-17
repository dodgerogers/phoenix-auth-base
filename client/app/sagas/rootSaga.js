import { all } from 'redux-saga/effects';
import AuthenticateSaga from '../authentication/sagas/AuthenticateSaga';

export default function* rootSaga() {
  yield all([
    AuthenticateSaga(),
  ]);
}
