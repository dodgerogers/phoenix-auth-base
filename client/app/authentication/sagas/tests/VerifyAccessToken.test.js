import { expectSaga } from 'redux-saga-test-plan';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { fromJS } from 'immutable';
import MockAdapter from 'axios-mock-adapter';
import HTTP from '../../../lib/utils/HTTP';
import * as AuthenticationSources from '../../sources';
import * as TokenStorage from '../../services/TokenStorage';
import VerifyAccessToken from '../VerifyAccessToken';

describe('VerifyAccessToken', () => {
  let mockAxios;
  const mockToken = { accessToken: 'token' };

  beforeAll(() => {
    mockAxios = new MockAdapter(HTTP);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  afterAll(() => {
    mockAxios.restore();
  });

  it('dispatches VERIFY_TOKEN_SUCCESS when AuthenticationSources.currentUser is successful', () => {
    const mockUser = { id: 42, name: 'Tucker' };
    const mockResponse = { user: mockUser };
    mockAxios.onGet('api/users/me').reply(200, mockResponse);

    const mockCookie = 'cookie';
    TokenStorage.store = jest.fn(() => Promise.resolve(mockCookie));

    return expectSaga(VerifyAccessToken)
      .provide([call(AuthenticationSources.currentUser), mockResponse])
      .provide([call(TokenStorage.store, mockToken)])
      .put({
        type: 'VERIFY_TOKEN_SUCCESS',
        user: mockUser,
      })
      .dispatch({ type: 'VERIFY_TOKEN_REQUEST', accessToken: mockToken })
      .run({ silenceTimeout: true });
  });

  it('dispatches VERIFY_TOKEN_FAILURE when TokenStorage.store fails', () => {
    const mockUser = { id: 42, name: 'Tucker' };
    const mockResponse = { user: mockUser };
    mockAxios.onGet('api/users/me').reply(200, mockResponse);

    TokenStorage.store = jest.fn(() => {
      throw 'error';
    });

    return expectSaga(VerifyAccessToken)
      .provide([call(AuthenticationSources.currentUser)])
      .provide([call(TokenStorage.store, mockToken)])
      .put({ type: 'VERIFY_TOKEN_FAILURE' })
      .dispatch({
        type: 'VERIFY_TOKEN_REQUEST',
        accessToken: mockToken,
      })
      .run({ silenceTimeout: true });
  });

  it('dispatches VERIFY_TOKEN_FAILURE when AuthenticationSources.currentUser fails', () => {
    const mockResponse = { error: 'Something went wrong' };
    mockAxios.onGet('api/users/me').reply(400, mockResponse);

    return expectSaga(VerifyAccessToken)
      .provide([call(AuthenticationSources.currentUser), mockResponse])
      .put({ type: 'VERIFY_TOKEN_FAILURE' })
      .dispatch({
        type: 'VERIFY_TOKEN_REQUEST',
        accessToken: mockToken,
      })
      .run({ silenceTimeout: true });
  });
});
