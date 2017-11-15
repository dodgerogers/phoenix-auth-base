import { stopAsyncValidation, SubmissionError } from 'redux-form/immutable';
import * as AuthenticationSources from './sources';
import { ModalActions, ModalIds } from '../common/modals';
import { actionTypes, formIDs } from './constants';

const authenticateSuccess = (user) => ({
  type: actionTypes.AUTHENTICATE_SUCCESS,
  user,
});

const authenticateFailure = (error) => ({
  type: actionTypes.AUTHENTICATE_FAILURE,
  error,
});

export function login(loginParams) {
  return dispatch => {
    return AuthenticationSources.login(loginParams.toJS())
      .then(response => {
        dispatch(authenticateSuccess(response.data));
        dispatch(ModalActions.hideModal(ModalIds.loginModal));
      })
      .catch(err => {
        dispatch(authenticateFailure(err.response.data.error))
        throw new SubmissionError({ _error: err.response.data.error });
      });
  };
}

const registerSuccess = (user) => ({
  type: actionTypes.REGISTER_SUCCESS,
  user,
});

const registerFailure = (error) => ({
  type: actionTypes.REGISTER_FAILURE,
  error,
});

export function register(registerParams) {
  return dispatch => {
    return AuthenticationSources.register(registerParams.toJS())
      .then(response => {
        dispatch(registerSuccess(response.data))
      })
      .catch(err => {
        dispatch(registerFailure(err.response.data.error))
        throw new SubmissionError(err.response.data.error);
      });
  };
}
