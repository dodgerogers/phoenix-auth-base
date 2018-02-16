import { expectSaga } from 'redux-saga-test-plan';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as TokenStorage from '../../lib/TokenStorage';
import * as AuthenticationSources from '../../sources';
import * as sagas from '../SignOut';

describe('SignOut', () => {
  it('dispatches SIGN_OUT_SUCCESS when services is successful', () => {
    TokenStorage.remove = jest.fn(() => Promise.resolve(null));
    AuthenticationSources.signOut = jest.fn(() => Promise.resolve({}));

    return expectSaga(sagas.SignOut)
      .provide([call(TokenStorage.remove)])
      .put({ type: 'SIGN_OUT_SUCCESS' })
      .put({
        id: undefined,
        type: 'CREATE_NOTIFICATION',
        notification: {
          level: 'success',
          message: 'Signed out successfully!',
        },
      })
      .dispatch({ type: 'SIGN_OUT_REQUEST' })
      .run({ silenceTimeout: true });
  });

  it('dispatches SIGN_OUT_FAILURE when AuthenticationSources.signOut fails', () => {
    TokenStorage.remove = jest.fn(() => Promise.resolve("cookie purged"));
    const mockResponse = { response: { data: { error: "Error" }}};
    AuthenticationSources.signOut = jest.fn(() => Promise.reject(mockResponse));

    return expectSaga(sagas.SignOut)
      .provide([call(TokenStorage.remove)])
      .provide([call(AuthenticationSources.signOut)])
      .put({ type: 'SIGN_OUT_FAILURE' })
      .put({
        id: undefined,
        type: 'CREATE_NOTIFICATION',
        notification: {
          level: 'negative',
          message: 'Error',
        },
      })
      .dispatch({ type: 'SIGN_OUT_REQUEST' })
      .run({ silenceTimeout: true });
  });

  it('dispatches SIGN_OUT_FAILURE when TokenStorage.remove fails', () => {
    TokenStorage.remove = jest.fn(() => Promise.reject("Error"));

    return expectSaga(sagas.SignOut)
      .provide([call(TokenStorage.remove)])
      .put({ type: 'SIGN_OUT_FAILURE' })
      .put({
        id: undefined,
        type: 'CREATE_NOTIFICATION',
        notification: {
          level: 'negative',
          message: 'Error',
        },
      })
      .dispatch({ type: 'SIGN_OUT_REQUEST' })
      .run({ silenceTimeout: true });
  });
});
