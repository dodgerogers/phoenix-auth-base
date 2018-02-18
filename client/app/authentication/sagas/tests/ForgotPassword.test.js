import { expectSaga } from 'redux-saga-test-plan';
import { fromJS } from 'immutable';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import ForgotPassword from '../ForgotPassword';
import { actionTypes } from '../../constants';


describe('ForgotPassword', () => {
  it('dispatches show modals and notification', () => {
    return expectSaga(ForgotPassword)
      .put({ type: 'SHOW_MODAL', data: { id: 'RESET_PASSWORD_MODAL' }})
      .put({
        type: '@@redux-form/INITIALIZE',
        meta: {
          form: 'PASSWORD_RESET',
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
          message: 'A password reset code has been sent',
        },
      })
      .dispatch({
        type: actionTypes.PASSWORD_RESET_REQUEST_SUCCESS,
        data: {
          formValues: fromJS({
            email: 'email',
          }),
        }
      })
      .run({ silenceTimeout: true });
  });
});
