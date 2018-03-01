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
    it('registerSuccess matches snapshot', () => {
      expect(AuthenticationActions.registerSuccess(null, null, { values: {}})).toMatchSnapshot();
    });

    it('registerFailure matches snapshot', () => {
      expect(AuthenticationActions.registerFailure(null)).toMatchSnapshot();
    });
  });

  describe('confirmation', () => {
    it('confirmationSuccess matches snapshot', () => {
      expect(AuthenticationActions.confirmationSuccess({ data: { accessToken: 'token'}})).toMatchSnapshot();
    });

    it('confirmationFailure matches snapshot', () => {
      expect(AuthenticationActions.confirmationFailure('error')).toMatchSnapshot();
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
      mockAxios.onPost('api/confirmations', args)
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
      mockAxios.onPost('api/confirmations', args)
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
