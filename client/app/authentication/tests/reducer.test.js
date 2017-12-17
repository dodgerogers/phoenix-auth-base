import { fromJS } from 'immutable';
import { actionTypes } from '../constants';
import authReducer, { initialState } from '../reducer';


describe('authReducer', () => {
  describe('VERIFY_TOKEN', () => {
    it('sets accessToken property', () => {
      const verifyToken = {
        type: actionTypes.VERIFY_TOKEN,
        accessToken: { accessToken: "token" },
      };

      expect(authReducer(initialState, verifyToken)).toMatchSnapshot();
    });
  });

  describe('VERIFY_TOKEN_SUCCESS', () => {
    it('sets currentUser property', () => {
      const verifyTokenSuccess = {
        type: actionTypes.VERIFY_TOKEN_SUCCESS,
        user: { id: 1 },
      };

      expect(authReducer(initialState, verifyTokenSuccess)).toMatchSnapshot();
    });
  });

  describe('VERIFY_TOKEN_FAILURE', () => {
    it('nulls currentUser and accessToken properties', () => {
      const authenticateFailure = {
        type: actionTypes.VERIFY_TOKEN_FAILURE,
      };

      expect(authReducer(initialState, authenticateFailure)).toMatchSnapshot();
    });
  });

  describe('AUTHENTICATE_FAILURE', () => {
    it('nulls currentUser and accessToken properties', () => {
      const authenticateFailure = {
        type: actionTypes.AUTHENTICATE_FAILURE,
      };

      expect(authReducer(initialState, authenticateFailure)).toMatchSnapshot();
    });
  });
});
