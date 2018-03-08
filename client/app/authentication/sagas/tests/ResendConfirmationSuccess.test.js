import { expectSaga } from 'redux-saga-test-plan';
import { fromJS } from 'immutable';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import ResendConfirmationSuccess from '../ResendConfirmationSuccess';
import { actionTypes } from '../../constants';


describe('ResendConfirmationSuccess', () => {
  it('dispatches show modals and notification', () => {
    return expectSaga(ResendConfirmationSuccess)
      .put({ type: 'SHOW_MODAL', data: { id: 'CONFIRMATION_MODAL' }})
      .put({
        type: '@@redux-form/INITIALIZE',
        meta: {
          form: 'CONFIRMATION',
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
          message: 'If an account exists we have sent a confirmation code',
        },
      })
      .dispatch({
        type: actionTypes.RESEND_CONFIRMATION_SUCCESS,
        formValues: fromJS({
          email: 'email',
        }),
      })
      .run({ silenceTimeout: true });
  });
});
