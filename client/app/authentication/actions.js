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
