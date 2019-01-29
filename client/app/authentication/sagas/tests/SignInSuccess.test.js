import { expectSaga } from 'redux-saga-test-plan';
import { fromJS } from 'immutable';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import SignInSuccess from '../SignInSuccess';
import { actionTypes } from '../../constants';


describe('ForgotSignInSuccessPassword', () => {
  it('makes getCurrentUserRequest and notifies user', () => {
    const accessToken = { token: 'token' };

    return expectSaga(SignInSuccess)
      .put({ type: 'HIDE_MODAL', data: { id: 'SIGN_IN_MODAL' }})
      .put({ type: 'GET_CURRENT_USER_REQUEST', accessToken })
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
});
