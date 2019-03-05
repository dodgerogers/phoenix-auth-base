import { expectSaga } from 'redux-saga-test-plan';
import { fromJS } from 'immutable';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import ConfirmationSuccess from '../ConfirmationSuccess';
import { actionTypes } from '../../constants';


describe('ConfirmationSuccess', () => {
  it('dispatches show modals and notification', () => {
    const accessToken = 'token';

    return expectSaga(ConfirmationSuccess)
      .put({ type: 'GET_CURRENT_USER_REQUEST' })
      .put({ type: 'HIDE_MODAL', data: { id: 'CONFIRMATION_MODAL' }})
      .put({
        id: undefined,
        type: 'CREATE_NOTIFICATION',
        notification: {
          level: 'success',
          message: 'Account successfully confirmed! You are now logged in',
        },
      })
      .dispatch({
        type: actionTypes.CONFIRMATION_SUCCESS,
        accessToken,
      })
      .run({ silenceTimeout: true });
  });
});
