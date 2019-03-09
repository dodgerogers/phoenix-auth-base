import { expectSaga } from 'redux-saga-test-plan';
import { fromJS } from 'immutable';
import { call, put, take, provide } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import SignInSuccess from '../SignInSuccess';
import * as TokenStorage from '../../services/TokenStorage';
import { actionTypes } from '../../constants';


describe('ForgotSignInSuccessPassword', () => {
  it('makes getCurrentAccountRequest and notifies user', () => {
    const accessToken = { token: 'token' };
    const mockCookie = 'cookie';
    TokenStorage.store = jest.fn(() => Promise.resolve(mockCookie));

    return expectSaga(SignInSuccess)
      .provide([call(TokenStorage.store, accessToken)])
      .put({ type: 'GET_CURRENT_USER_REQUEST' })
      .put({ type: 'HIDE_MODAL', data: { id: 'SIGN_IN_MODAL' }})
      .put({
        id: undefined,
        type: 'CREATE_NOTIFICATION',
        notification: {
          level: 'success',
          message: 'Logged in successfully',
        },
      })
      .dispatch({
        type: actionTypes.SIGN_IN_SUCCESS,
        accessToken,
      })
      .run({ silenceTimeout: true });
  });

  // TODO: Extra cases
});
