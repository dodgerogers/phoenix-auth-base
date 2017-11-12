import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import HTTP from '../../lib/utils/HTTP';
import MockAdapter from 'axios-mock-adapter';
import { fromJS } from 'immutable';
import * as AuthenticationActions from '../actions';
import * as AuthenticationSources from '../sources';
import { formIDs, actionTypes } from '../constants';
import { actionTypes as modalActionTypes, ModalIds } from '../../common/modals';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async AuthenticationActions', () => {
  let mockAxios, email, password;
  beforeAll(() => {
    mockAxios = new MockAdapter(HTTP);
    email = 'email@email.com';
    password = 'password';
  });

  afterEach(() => {
    mockAxios.reset();
  });

  afterAll(() => {
    mockAxios.restore();
  });

  it('when login is successful', () => {
    const mockResponse = {
      id: 1,
      name: 'name',
    };

    mockAxios.onPost('api/sessions', { session: { email, password }}).reply(200, mockResponse);

    const store = mockStore();
    const params = fromJS({ email, password });

    return store.dispatch(AuthenticationActions.login(params))
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  it('when login fails', () => {
    const mockResponse = {
      error: 'Invalid credentials',
    };

    mockAxios.onPost('api/sessions', { session: { email, password }}).reply(422, mockResponse);

    const store = mockStore();
    const params = fromJS({ email, password });

    return store.dispatch(AuthenticationActions.login(params))
      .catch(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });
});
