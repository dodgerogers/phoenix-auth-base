import { expectSaga } from 'redux-saga-test-plan';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as sagas from '../ForgotPasswordSaga';
import { actionTypes } from '../../constants';


describe('ForgotPasswordSaga', () => {
  it('dispatches hide/show modals and notification', () => {
    return expectSaga(sagas.ForgotPasswordSaga)
      .put({ type: 'HIDE_MODAL', data: { id: 'FORGOT_PASSWORD_MODAL' }})
      .put({ type: 'SHOW_MODAL', data: { id: 'RESET_PASSWORD_MODAL' }})
      .put({
        id: 'AUTHENTICATION',
        type: 'CREATE_NOTIFICATION',
        notification: {
          level: 'success',
          message: 'A password reset code has been sent',
        },
      })
      .dispatch({ type: actionTypes.PASSWORD_RESET_REQUEST_SUCCESS })
      .run({ silenceTimeout: true });
  });
});
