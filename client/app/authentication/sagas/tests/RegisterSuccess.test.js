import { expectSaga } from 'redux-saga-test-plan';
import { fromJS } from 'immutable';
import { call, put, take } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import RegisterSuccess from '../RegisterSuccess';
import { actionTypes } from '../../constants';


describe('RegisterSuccess', () => {
  it('initializes confirmation form and notifies user', () => {
    const accessToken = { token: 'token' };

    return expectSaga(RegisterSuccess)
      .put({ type: 'SHOW_MODAL', data: { id: 'CONFIRMATION_MODAL' }})
      .put({
        type: '@@redux-form/INITIALIZE',
        meta: {
          form: 'CONFIRMATION',
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
          message: 'An email confirmation has been sent',
        },
      })
      .dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        formValues: fromJS({
          name: 'name',
          email: 'email',
          password: 'password',
          passwordConfirmation: 'passwordConfirmation',
        }),
      })
      .run({ silenceTimeout: true });
  });
});
