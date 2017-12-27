import { expectSaga } from 'redux-saga-test-plan';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as TokenStorage from '../../lib/TokenStorage';
import * as sagas from '../SignOutSaga';

describe('SignOutSaga', () => {
  const mockToken = { accessToken: 'token' };

  it('dispatches PURGE_TOKEN_SUCCESS when TokenStorage.remove is successful', () => {
    TokenStorage.remove = jest.fn(() => Promise.resolve(null));

    return expectSaga(sagas.SignOutSaga)
      .provide([call(TokenStorage.remove)])
      .put({ type: 'PURGE_TOKEN_SUCCESS' })
      .put({
        id: undefined,
        type: 'CREATE_NOTIFICATION',
        notification: {
          level: 'success',
          message: 'Signed out successfully!',
        },
      })
      .dispatch({ type: 'SIGN_OUT_SUCCESS' })
      .run({ silenceTimeout: true });
  });

  it('dispatches PURGE_TOKEN_FAILURE when TokenStorage.remove fails', () => {
    TokenStorage.remove = jest.fn(() => Promise.reject("Error"));

    return expectSaga(sagas.SignOutSaga)
      .provide([call(TokenStorage.remove)])
      .put({ type: 'PURGE_TOKEN_FAILURE' })
      .put({
        id: undefined,
        type: 'CREATE_NOTIFICATION',
        notification: {
          level: 'negative',
          message: 'Error',
        },
      })
      .dispatch({ type: 'SIGN_OUT_SUCCESS' })
      .run({ silenceTimeout: true });
  });
});
