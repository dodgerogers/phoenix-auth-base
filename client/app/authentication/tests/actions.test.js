import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import normalize from 'normalize-object';
import * as AuthenticationActions from '../actions';
import * as AuthenticationSources from '../sources';
import * as TokenStorage from '../services/TokenStorage';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async AuthenticationActions', () => {
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
    it('resendConfirmationSuccess matches snapshot', () => {
      expect(AuthenticationActions.resendConfirmationSuccess(null, null, { values: {}})).toMatchSnapshot();
    });

    it('resendConfirmationFailure matches snapshot', () => {
      expect(AuthenticationActions.resendConfirmationFailure('error')).toMatchSnapshot();
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
