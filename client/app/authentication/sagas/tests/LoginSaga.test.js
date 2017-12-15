import { expectSaga } from 'redux-saga-test-plan';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import MockAdapter from 'axios-mock-adapter';
import { fromJS } from 'immutable';
import HTTP from '../../../lib/utils/HTTP';
import * as AuthenticationSources from '../../sources';
import * as TokenStorage from '../../lib/TokenStorage';
import * as sagas from '../LoginSaga';

describe('LoginSaga', () => {
  let mockAxios;
  const mockToken = { access_token: 'token' };

  beforeAll(() => {
    mockAxios = new MockAdapter(HTTP);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  afterAll(() => {
    mockAxios.restore();
  });

  it('dispatches GET_CURRENT_RESOURCE_SUCCESS when AuthenticationSources.currentUser is successful', () => {
    const mockUser = { id: 42, name: 'Tucker' };
    const mockResponse = { user: mockUser };
    mockAxios.onGet('api/users/me').reply(200, mockResponse);

    const mockCookie = 'cookie';
    TokenStorage.store = jest.fn(() => Promise.resolve(mockCookie));

    return expectSaga(sagas.loginSaga)
      .provide([call(AuthenticationSources.currentUser), mockResponse])
      .provide([call(TokenStorage.store, mockToken)])
      .put({
        type: 'GET_CURRENT_RESOURCE_SUCCESS',
        user: mockUser,
      })
      .dispatch({ type: 'AUTHENTICATE_SUCCESS', accessToken: mockToken })
      .run({ silenceTimeout: true });
  });

  it('dispatches GET_CURRENT_RESOURCE_FAILURE when TokenStorage.store fails', () => {
    const mockUser = { id: 42, name: 'Tucker' };
    const mockResponse = { user: mockUser };
    mockAxios.onGet('api/users/me').reply(200, mockResponse);

    TokenStorage.store = jest.fn(() => {
      throw 'error';
    });

    return expectSaga(sagas.loginSaga)
      .provide([call(AuthenticationSources.currentUser)])
      .provide([call(TokenStorage.store, mockToken)])
      .put({
        type: 'GET_CURRENT_RESOURCE_FAILURE',
      })
      .dispatch({ type: 'AUTHENTICATE_SUCCESS', accessToken: mockToken })
      .run({ silenceTimeout: true });
  });

  it('dispatches GET_CURRENT_RESOURCE_FAILURE when AuthenticationSources.currentUser fails', () => {
    const mockResponse = { error: 'Something went wrong' };
    mockAxios.onGet('api/users/me').reply(400, mockResponse);

    return expectSaga(sagas.loginSaga)
      .provide([call(AuthenticationSources.currentUser), mockResponse])
      .put({
        type: 'GET_CURRENT_RESOURCE_FAILURE',
      })
      .dispatch({ type: 'AUTHENTICATE_SUCCESS', accessToken: mockToken })
      .run({ silenceTimeout: true });
  });
});
