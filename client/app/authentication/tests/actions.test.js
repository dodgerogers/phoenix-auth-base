import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as AuthenticationActions from '../actions';


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

  describe('refreshToken', () => {
    it('refreshToken matches snapshot', () => {
      expect(AuthenticationActions.refreshTokenRequest()).toMatchSnapshot();
    });

    it('refreshTokenSuccess matches snapshot', () => {
      expect(AuthenticationActions.refreshTokenSuccess("token")).toMatchSnapshot();
    });

    it('refreshTokenFailure matches snapshot', () => {
      expect(AuthenticationActions.refreshTokenFailure()).toMatchSnapshot();
    });
  });

  describe('signInSuccess', () => {
    it('matches snapshot', () => {
      expect(AuthenticationActions.signInSuccess('token')).toMatchSnapshot();
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
