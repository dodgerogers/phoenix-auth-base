import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import HTTP from '../../lib/utils/HTTP';
import MockAdapter from 'axios-mock-adapter';
import { fromJS } from 'immutable';
import normalize from 'normalize-object';
import * as AuthenticationActions from '../actions';
import * as AuthenticationSources from '../sources';
import * as TokenStorage from '../lib/TokenStorage';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async AuthenticationActions', () => {
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

  describe('authenticate', () => {
    afterEach(() => {
      TokenStorage.fetch.mockReset();
    });

    it('when TokenStore.fetch is successful', () => {
      const mockToken = { accessToken: "token" };
      TokenStorage.fetch = jest.fn(() => Promise.resolve(mockToken));

      const store = mockStore();

      return store.dispatch(AuthenticationActions.authenticate())
        .then(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });

    it('when TokenStore.fetch fails', () => {
      TokenStorage.fetch = jest.fn(() => Promise.reject("Error"));

      const store = mockStore();

      return store.dispatch(AuthenticationActions.authenticate())
        .then((err) => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });
  });

  describe('signOut', () => {
    it('when AuthenticationSources.signOut is successful', () => {
      mockAxios.onDelete('api/oauth/token')
        .reply(204, {});

      const store = mockStore();

      return store.dispatch(AuthenticationActions.signOut())
        .then(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });

    it('when AuthenticationSources.signOut fails', () => {
      const error = 'Something went wrong';
      mockAxios.onDelete('api/oauth/token')
        .reply(400, { error });

      const store = mockStore();

      return store.dispatch(AuthenticationActions.signOut())
        .then(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });
  });

  describe('register', () => {
    let args;
    beforeEach(() => {
      const password = 'password';
      args = {
        name: 'Bob',
        email: 'email@email.com',
        password,
        passwordConfirmation: password,
      };
    });

    it('when registration is successful', () => {
      const mockResponse = { id: 1, name: args.name, email: args.email };
      mockAxios.onPost('api/registrations', { registration: normalize(args, 'snake') })
        .reply(200, mockResponse);

      const store = mockStore();
      const params = fromJS(args);

      return store.dispatch(AuthenticationActions.register(params))
        .then(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });

    it('when registration fails', () => {
      const mockResponse = {
        error: {
          email: 'Has already been taken',
        }
      };
      mockAxios.onPost('api/registrations', { registration: normalize(args, 'snake') })
        .reply(400, mockResponse);

      const store = mockStore();
      const params = fromJS(args);

      return store.dispatch(AuthenticationActions.register(params))
        .catch(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });
  });

  describe('confirmation', () => {
    let args;
    beforeEach(() => {
      const email = 'email@email.com';
      const password = 'password';
      const confirmationToken = 'token';
      args = {
        email,
        password,
        confirmationToken: confirmationToken
      };
    });

    it('when confirmation is successful', () => {
      const mockResponse = { id: 1, name: args.name, email: args.email };
      mockAxios.onPut('api/confirmations', { confirmation: normalize(args, 'snake') })
        .reply(200, mockResponse);

      const store = mockStore();
      const params = fromJS(args);

      return store.dispatch(AuthenticationActions.confirm(params))
        .then(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });

    it('when confirmation fails', () => {
      const mockResponse = {
        error: "Invalid credentials",
      };
      mockAxios.onPut('api/confirmations', { confirmation: normalize(args, 'snake') })
        .reply(400, mockResponse);

      const store = mockStore();
      const params = fromJS(args);

      return store.dispatch(AuthenticationActions.confirm(params))
        .catch(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });
  });

  describe('login', () => {
    let email, password;
    beforeAll(() => {
      email = 'email@email.com';
      password = 'password';
    });

    it('when login is successful', () => {
      const mockTokenResponse = {
        message: "Login successful",
        accessToken: {
          accessToken: "code",
        }
      };

      mockAxios.onPost('api/oauth/token', { grant_type: 'password', username: email, password })
        .reply(200, mockTokenResponse);

      const mockUserResponse = {
        id: 1,
        name: 'name',
      }

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

      mockAxios.onPost('api/oauth/token', { grant_type: 'password', username: email, password })
        .reply(401, mockResponse);

      const store = mockStore();
      const params = fromJS({ email, password });

      return store.dispatch(AuthenticationActions.login(params))
        .catch(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });
  });

  describe('resendConfirmation', () => {
    let args;
    beforeEach(() => {
      const email = 'email@email.com';
      args = {
        email,
      };
    });

    it('when resendConfirmation is successful', () => {
      const mockResponse = { message: "Success" };
      mockAxios.onPost('api/confirmations', { confirmation: args })
        .reply(200, mockResponse);

      const store = mockStore();
      const params = fromJS(args);

      return store.dispatch(AuthenticationActions.resendConfirmation(params))
        .then(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });

    it('when confirmation fails', () => {
      const mockResponse = {
        error: "Invalid credentials",
      };
      mockAxios.onPost('api/confirmations', { confirmation: args })
        .reply(400, mockResponse);

      const store = mockStore();
      const params = fromJS(args);

      return store.dispatch(AuthenticationActions.resendConfirmation(params))
        .catch(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });
  });
});
