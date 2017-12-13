import { expectSaga } from 'redux-saga-test-plan';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import MockAdapter from 'axios-mock-adapter';
import { fromJS } from 'immutable';
import HTTP from '../../../lib/utils/HTTP';
import * as AuthenticationSources from '../../sources';
import * as sagas from '../getCurrentResourceSaga';

describe('getCurrentResource', () => {
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

  it('dispatches GET_CURRENT_RESOURCE_SUCCESS when AuthenticationSources.currentUser is successful', () => {
    const mockUser = { id: 42, name: 'Tucker' };
    const mockResponse = { user: mockUser };
    mockAxios.onGet('api/users/me').reply(200, mockResponse);

    return expectSaga(sagas.getCurrentResource)
      .provide([matchers.call.fn(AuthenticationSources.currentUser), mockResponse])
      .put({
        type: 'GET_CURRENT_RESOURCE_SUCCESS',
        user: mockUser,
      })
      .dispatch({ type: 'AUTHENTICATE_SUCCESS'})
      .run();
  });

  it('dispatches GET_CURRENT_RESOURCE_FAILURE when AuthenticationSources.currentUser fails', () => {
    const mockResponse = { error: "Something went wrong" };
    mockAxios.onGet('api/users/me').reply(400, mockResponse);

    return expectSaga(sagas.getCurrentResource)
      .provide([matchers.call.fn(AuthenticationSources.currentUser), mockResponse])
      .put({
        type: 'GET_CURRENT_RESOURCE_FAILURE',
        error: mockResponse.error,
      })
      .dispatch({ type: 'AUTHENTICATE_SUCCESS' })
      .run();
  });
});
