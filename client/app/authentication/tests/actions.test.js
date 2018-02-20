import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import HTTP from '../../lib/utils/HTTP';
import MockAdapter from 'axios-mock-adapter';
import { fromJS } from 'immutable';
import normalize from 'normalize-object';
import * as AuthenticationActions from '../actions';
import * as AuthenticationSources from '../sources';
import * as TokenStorage from '../services/TokenStorage';


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

  describe('authenticateWithStoredToken', () => {
    it('matches snapshot', () => {
      expect(AuthenticationActions.authenticateWithStoredToken()).toMatchSnapshot();
    });
  });

  describe('signOut', () => {
    it('signOutRequest matches snapshot', () => {
      expect(AuthenticationActions.signOutRequest()).toMatchSnapshot();
    });

    it('signOutSuccess matches snapshot', () => {
      expect(AuthenticationActions.signOutSuccess()).toMatchSnapshot();
    });

    it('signOutFailure matches snapshot', () => {
      expect(AuthenticationActions.signOutFailure()).toMatchSnapshot();
    });
  });

  describe('verifyToken', () => {
    it('verifyTokenRequest matches snapshot', () => {
      expect(AuthenticationActions.verifyTokenRequest()).toMatchSnapshot();
    });

    it('verifyTokenSuccess matches snapshot', () => {
      expect(AuthenticationActions.verifyTokenSuccess()).toMatchSnapshot();
    });

    it('verifyTokenFailure matches snapshot', () => {
      expect(AuthenticationActions.verifyTokenFailure()).toMatchSnapshot();
    });
  });

  describe('refreshToken', () => {
    it('refreshToken matches snapshot', () => {
      expect(AuthenticationActions.refreshTokenRequest()).toMatchSnapshot();
    });

    it('refreshTokenSuccess matches snapshot', () => {
      expect(AuthenticationActions.refreshTokenSuccess()).toMatchSnapshot();
    });

    it('refreshTokenFailure matches snapshot', () => {
      expect(AuthenticationActions.refreshTokenFailure()).toMatchSnapshot();
    });
  });

  describe('signInSuccess', () => {
    it('matches snapshot', () => {
      const mockResponse = {
        data: {
          accessToken: 'token',
        },
      };
      expect(AuthenticationActions.signInSuccess(mockResponse)).toMatchSnapshot();
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
      mockAxios.onPost('api/registrations', normalize(args, 'snake'))
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
      mockAxios.onPost('api/registrations', normalize(args, 'snake'))
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
        confirmationToken: confirmationToken,
      };
    });

    it('when confirmation is successful', () => {
      const mockResponse = { access_token: { access_token: "token" } };
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
      const mockResponse = { error: "Invalid credentials" };
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

  describe('resendConfirmation', () => {
    let args;
    beforeEach(() => {
      const email = 'email@email.com';
      args = {
        email,
      };
    });

    it('when resendConfirmation is successful', () => {
      mockAxios.onPost('api/confirmations', { confirmation: args })
        .reply(200, {});

      const store = mockStore();
      const params = fromJS(args);

      return store.dispatch(AuthenticationActions.resendConfirmation(params))
        .then(() => {
          expect(store.getActions()).toMatchSnapshot();
        });
    });

    it('when resendConfirmation fails', () => {
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

  describe('passwordResetRequestSuccess', () => {
    it('matches snapshot', () => {
      expect(AuthenticationActions.passwordResetRequestSuccess(null, null, { values: {}})).toMatchSnapshot();
    });
  });

  describe('resetPasswordSuccess', () => {
    it('matches snapshot', () => {
      expect(AuthenticationActions.resetPasswordSuccess(null, null, { values: {}})).toMatchSnapshot();
    });
  });
});
