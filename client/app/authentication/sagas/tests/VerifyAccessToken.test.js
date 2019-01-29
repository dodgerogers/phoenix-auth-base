import { expectSaga } from 'redux-saga-test-plan';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { fromJS } from 'immutable';
import MockAdapter from 'axios-mock-adapter';
import HTTP from '../../../lib/utils/HTTP';
import * as AuthenticationSources from '../../sources';
import * as AccountSources from '../../../accounts/sources';
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

  it('dispatches GET_CURRENT_USER_SUCCESS when AuthenticationSources.currentUser is successful', () => {
    const mockUser = { id: 42, name: 'Tucker' };
    const mockProfile = {id: 1, name: 'name'};
    const mockResponse = { user: mockUser };
    const mockProfilesResponse = { profiles: [mockProfile]};
    mockAxios.onGet('api/current_user').reply(200, mockResponse);
    mockAxios.onGet('api/current_user/profiles').reply(200, mockResponse);

    const mockCookie = 'cookie';
    TokenStorage.store = jest.fn(() => Promise.resolve(mockCookie));

    return expectSaga(VerifyAccessToken)
      .provide([call(AccountSources.currentUser), mockResponse])
      .provide([call(AccountSources.currentUserProfiles), mockResponse])
      .provide([call(TokenStorage.store, mockToken)])
      .put({
        type: 'GET_CURRENT_USER_SUCCESS',
        user: mockUser,
      })
      .put({
        type: 'GET_CURRENT_USER_PROFILE_SUCCESS',
        user: [mockProfile],
      })
      .dispatch({ type: 'VERIFY_TOKEN_REQUEST', accessToken: mockToken })
      .run({ silenceTimeout: true });
  });

  it('dispatches GET_CURRENT_USER_FAILURE when TokenStorage.store fails', () => {
    const mockUser = { id: 42, name: 'Tucker' };
    const mockResponse = { user: mockUser };
    const mockProfilesResponse = { profiles: [{id: 1, name: 'name'}]};
    mockAxios.onGet('api/current_user').reply(200, mockResponse);
    mockAxios.onGet('api/current_user/profiles').reply(200, mockResponse);

    TokenStorage.store = jest.fn(() => {
      throw 'error';
    });

    return expectSaga(VerifyAccessToken)
      .provide([call(AccountSources.currentUser)])
      .provide([call(AccountSources.currentUserProfiles), mockResponse])
      .provide([call(TokenStorage.store, mockToken)])
      .put({ type: 'GET_CURRENT_USER_FAILURE' })
      .dispatch({
        type: 'VERIFY_TOKEN_REQUEST',
        accessToken: mockToken,
      })
      .run({ silenceTimeout: true });
  });

  it('dispatches GET_CURRENT_USER_FAILURE when AuthenticationSources.currentUser fails', () => {
    const mockUser = { id: 42, name: 'Tucker' };
    const mockUserResponse = { user: mockUser };
    const mockProfileResponse = { error: 'Something went wrong' };
    mockAxios.onGet('api/current_user').reply(200, mockUserResponse);
    mockAxios.onGet('api/current_user/profiles').reply(400, mockProfileResponse);

    return expectSaga(VerifyAccessToken)
      .provide([call(AccountSources.currentUser), mockResponse])
      .provide([call(AccountSources.currentUserProfiles), mockProfileResponse])
      .put({ type: 'GET_CURRENT_USER_PROFILES_FAILURE' })
      .dispatch({
        type: 'VERIFY_TOKEN_REQUEST',
        accessToken: mockToken,
      })
      .run({ silenceTimeout: true });
  });

  it('dispatches GET_CURRENT_USER_PROFILES_FAILURE when AuthenticationSources.currentUserProfiles fails', () => {
    const mockResponse = { error: 'Something went wrong' };
    mockAxios.onGet('api/current_user').reply(400, mockResponse);

    return expectSaga(VerifyAccessToken)
      .provide([call(AuthenticationSources.currentUser), mockResponse])
      .put({ type: 'GET_CURRENT_USER_FAILURE' })
      .dispatch({
        type: 'VERIFY_TOKEN_REQUEST',
        accessToken: mockToken,
      })
      .run({ silenceTimeout: true });
  });
});
