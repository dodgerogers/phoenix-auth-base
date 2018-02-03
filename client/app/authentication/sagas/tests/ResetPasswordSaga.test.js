import { expectSaga } from 'redux-saga-test-plan';
import { fromJS } from 'immutable';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as sagas from '../ResetPasswordSaga';
import { actionTypes } from '../../constants';


describe('ResetPasswordSaga', () => {
  it('dispatches show modals and notification', () => {
    return expectSaga(sagas.ResetPasswordSaga)
      .put({ type: 'SHOW_MODAL', data: { id: 'LOGIN_MODAL' }})
      .put({
        type: '@@redux-form/INITIALIZE',
        meta: {
          form: 'SESSION',
          keepDirty: undefined,
        },
        payload: fromJS({
          email: 'email',
          password: 'password',
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
        data: {
          formValues: fromJS({
            email: 'email',
            password: 'password',
            passwordConfirmation: 'passwordConfirmation',
          }),
        },
      })
      .run({ silenceTimeout: true });
  });
});
