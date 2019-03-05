import { expectSaga } from 'redux-saga-test-plan';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as AuthenticationSources from '../../sources';
import RefreshToken from '../RefreshToken';


describe('RefreshToken', () => {
  const accessToken = { accessToken: 'token' };

  it('dispatches REFRESH_TOKEN_SUCCESS when AuthenticationSources.extendSession is successful', () => {
    const mockResponse = { data: { accessToken }};
    AuthenticationSources.extendSession = jest.fn(() => Promise.resolve(mockResponse));

    return expectSaga(RefreshToken)
      .provide([call(AuthenticationSources.extendSession, mockResponse)])
      .put({ type: 'REFRESH_TOKEN_SUCCESS', accessToken })
      .put({ type: 'GET_CURRENT_USER_REQUEST' })
      .dispatch({ type: 'REFRESH_TOKEN_REQUEST' })
      .run({ silenceTimeout: true });
  });

  it('dispatches REFRESH_TOKEN_FAILURE when AuthenticationSources.extendSession fails', () => {
    AuthenticationSources.extendSession = jest.fn(() => {
      throw 'error';
    });

    return expectSaga(RefreshToken)
      .provide([call(AuthenticationSources.extendSession)])
      .put({ type: 'SIGN_OUT_REQUEST' })
      .put({ type: 'REFRESH_TOKEN_FAILURE' })
      .dispatch({ type: 'REFRESH_TOKEN_REQUEST' })
      .run({ silenceTimeout: true });
  });
});
