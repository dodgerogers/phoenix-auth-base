import { all } from 'redux-saga/effects';
import getCurrentResourceSaga from '../authentication/sagas/getCurrentResourceSaga';

export default function* rootSaga() {
  yield all([
    getCurrentResourceSaga(),
  ]);
}
