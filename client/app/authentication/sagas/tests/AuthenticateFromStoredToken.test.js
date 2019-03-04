import { expectSaga } from 'redux-saga-test-plan';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { fromJS } from 'immutable';
import * as TokenStorage from '../../services/TokenStorage';
import AuthenticateFromStoredToken from '../AuthenticateFromStoredToken';


describe('AuthenticateFromCookie', () => {
  const accessToken = { accessToken: 'token' };

  it('dispatches GET_CURRENT_USER_REQUEST when TokenStorage.fetch is successful', () => {
    TokenStorage.fetch = jest.fn(() => Promise.resolve(accessToken));

    return expectSaga(AuthenticateFromStoredToken)
      .provide([call(TokenStorage.fetch, accessToken)])
      .put({ type: 'GET_CURRENT_USER_REQUEST' })
      .dispatch({
        type: 'AUTHENTICATE_WITH_STORED_TOKEN_REQUEST',
        accessToken,
      })
      .run({ silenceTimeout: true });
  });

  it('dispatches AUTHENTICATE_FAILURE when TokenStorage.store fails', () => {
    TokenStorage.fetch = jest.fn(() => {
      throw 'error';
    });

    return expectSaga(AuthenticateFromStoredToken)
      .provide([call(TokenStorage.fetch, accessToken)])
      .put({
        type: 'AUTHENTICATE_FAILURE',
        error: undefined,
      })
      .dispatch({
        type: 'AUTHENTICATE_WITH_STORED_TOKEN_REQUEST',
        accessToken,
      })
      .run({ silenceTimeout: true });
  });
});
