import { fromJS } from 'immutable';
import { actionTypes } from '../constants';
import authReducer, { initialState } from '../reducer';


describe('authReducer', () => {
  describe('GET_CURRENT_USER_REQUEST', () => {
    it('sets accessToken property', () => {
      const getCurrentUser = {
        type: actionTypes.GET_CURRENT_USER_REQUEST,
        accessToken: { accessToken: "token" },
      };

      expect(authReducer(initialState, getCurrentUser)).toMatchSnapshot();
    });
  });

  describe('GET_CURRENT_USER_SUCCESS', () => {
    it('sets currentUser property', () => {
      const getCurrentUserSuccess = {
        type: actionTypes.GET_CURRENT_USER_SUCCESS,
        user: { id: 1 },
      };

      expect(authReducer(initialState, getCurrentUserSuccess)).toMatchSnapshot();
    });
  });

  describe('GET_CURRENT_USER_FAILURE', () => {
    it('nulls currentUser and accessToken properties', () => {
      const authenticateFailure = {
        type: actionTypes.GET_CURRENT_USER_FAILURE,
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

  describe('REFRESH_TOKEN', () => {
    it('REFRESH_TOKEN_REQUEST sets refreshing to true', () => {
      const refreshRequest = {
        type: actionTypes.REFRESH_TOKEN_REQUEST,
      };

      expect(authReducer(initialState, refreshRequest)).toMatchSnapshot();
    });

    it('REFRESH_TOKEN_SUCCESS sets refreshing to false', () => {
      const refreshSuccess = {
        type: actionTypes.REFRESH_TOKEN_REQUEST,
      };

      expect(authReducer(initialState, refreshSuccess)).toMatchSnapshot();
    });

    it('REFRESH_TOKEN_FAILURE sets refreshing to false', () => {
      const refreshFailure = {
        type: actionTypes.REFRESH_TOKEN_REQUEST,
      };

      expect(authReducer(initialState, refreshFailure)).toMatchSnapshot();
    });
  });
});
