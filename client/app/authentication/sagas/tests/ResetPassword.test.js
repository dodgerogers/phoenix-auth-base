import { expectSaga } from 'redux-saga-test-plan';
import { fromJS } from 'immutable';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import ResetPassword from '../ResetPassword';
import { actionTypes } from '../../constants';


describe('ResetPassword', () => {
  it('dispatches show modals and notification', () => {
    return expectSaga(ResetPassword)
      .put({ type: 'SHOW_MODAL', data: { id: 'SIGN_IN_MODAL' }})
      .put({
        type: '@@redux-form/INITIALIZE',
        meta: {
          form: 'SIGN_IN',
          keepDirty: undefined,
        },
        payload: fromJS({
          email: 'email',
        }),
      })
      .put({
        id: 'AUTHENTICATION',
        type: 'CREATE_NOTIFICATION',
        notification: {
          level: 'success',
          message: 'Your password has been reset',
        },
      })
      .dispatch({
        type: actionTypes.RESET_PASSWORD_SUCCESS,
        formValues: fromJS({
          email: 'email',
          password: 'password',
          passwordConfirmation: 'passwordConfirmation',
        }),
      })
      .run({ silenceTimeout: true });
  });
});
