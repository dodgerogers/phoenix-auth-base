import { all } from 'redux-saga/effects';
import LoginSaga from '../authentication/sagas/LoginSaga';

export default function* rootSaga() {
  yield all([
    LoginSaga(),
  ]);
}
