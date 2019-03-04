import { expectSaga } from 'redux-saga-test-plan';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { fromJS } from 'immutable';
import MockAdapter from 'axios-mock-adapter';
import HTTP from '../../../lib/utils/HTTP';
import * as AuthenticationSources from '../../sources';
import * as AccountSources from '../../../accounts/sources';
import FetchCurrentUserInformation from '../FetchCurrentUserInformation';

describe('FetchCurrentUserInformation', () => {
  let mockAxios;

  beforeAll(() => {
    mockAxios = new MockAdapter(HTTP);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  afterAll(() => {
    mockAxios.restore();
  });

  it('dispatches expected actions when all API calls are successful', () => {
    const mockUser = { id: 42, name: 'Tucker' };
    const mockProfile = { id: 1, name: 'name' };
    const mockUserResponse = { user: mockUser };
    const mockProfilesResponse = { profiles: [mockProfile] };
    mockAxios.onGet('api/current_user').reply(200, mockUserResponse);
    mockAxios.onGet('api/current_user/profiles').reply(200, mockProfilesResponse);

    return expectSaga(FetchCurrentUserInformation)
      .provide([call(AccountSources.currentUser), mockUserResponse])
      .provide([call(AccountSources.currentUserProfiles), mockProfilesResponse])
      .put({
        type: 'GET_CURRENT_USER_SUCCESS',
        user: mockUser,
      })
      .put({
        type: 'GET_CURRENT_USER_PROFILES_SUCCESS',
        profiles: [mockProfile],
      })
      .dispatch({ type: 'GET_CURRENT_USER_REQUEST' })
      .run({ silenceTimeout: true });
  });

  it('dispatches GET_CURRENT_USER_FAILURE when AuthenticationSources.currentUser fails', () => {
    const mockUser = { id: 42, name: 'Tucker' };
    const mockUserResponse = { user: mockUser };
    const mockProfileResponse = { error: 'Something went wrong' };
    mockAxios.onGet('api/current_user').reply(200, mockUserResponse);
    mockAxios.onGet('api/current_user/profiles').reply(400, mockProfileResponse);

    return expectSaga(FetchCurrentUserInformation)
      .provide([call(AccountSources.currentUser), mockUserResponse])
      .provide([call(AccountSources.currentUserProfiles), mockProfileResponse])
      .put({ type: 'GET_CURRENT_USER_FAILURE' })
      .put({ type: 'GET_CURRENT_USER_PROFILES_FAILURE' })
      .dispatch({ type: 'GET_CURRENT_USER_REQUEST' })
      .run({ silenceTimeout: true });
  });

  it('dispatches GET_CURRENT_USER_PROFILES_FAILURE when AuthenticationSources.currentUserProfiles fails', () => {
    const mockUserResponse = { error: 'Something went wrong' };
    mockAxios.onGet('api/current_user').reply(400, mockUserResponse);

    return expectSaga(FetchCurrentUserInformation)
      .provide([call(AuthenticationSources.currentUser), mockUserResponse])
      .put({ type: 'GET_CURRENT_USER_FAILURE' })
      .put({ type: 'GET_CURRENT_USER_PROFILES_FAILURE' })
      .dispatch({ type: 'GET_CURRENT_USER_REQUEST' })
      .run({ silenceTimeout: true });
  });
});
