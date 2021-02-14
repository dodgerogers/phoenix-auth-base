import { fromJS } from 'immutable';
import { actionTypes } from '../constants';
import authReducer, { initialState } from '../reducer';


describe('accountsReducer', () => {
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
});
