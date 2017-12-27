import { stopAsyncValidation, SubmissionError } from 'redux-form/immutable';
import * as AuthenticationSources from './sources';
import { ModalActions, ModalIds } from '../common/modals';
import { actionTypes, formIDs } from './constants';
import { NotificationActions, areaIDs } from '../common/Notifications';
import * as TokenStorage from './lib/TokenStorage';


const verifyToken = (accessToken) => ({
  type: actionTypes.VERIFY_TOKEN,
  accessToken,
});

const authenticateFailure = (error) => ({
  type: actionTypes.AUTHENTICATE_FAILURE,
  error,
});

export const authenticate = () => {
  return dispatch => {
    return TokenStorage.fetch()
      .then(accessToken => dispatch(verifyToken(accessToken)))
      .catch(err => dispatch(authenticateFailure(err)));
  }
}

const signOutSuccess = () => ({
  type: actionTypes.SIGN_OUT_SUCCESS,
});

const signOutFailure = () => ({
  type: actionTypes.SIGN_OUT_FAILURE,
});

export const signOut = () => {
  return dispatch => {
    return AuthenticationSources.signOut()
      .then(() => dispatch(signOutSuccess()))
      .catch(err => {
        dispatch(NotificationActions.notifyError(err.response.data.error))
        dispatch(signOutFailure());
      });
  };
}

// TODO: Move modal and notification actions into saga
export function login(loginParams) {
  return dispatch => {
    return AuthenticationSources.login(loginParams.toJS())
      .then(response => {
        dispatch(verifyToken(response.data.accessToken))
        dispatch(NotificationActions.notify(response.data.message))
        dispatch(ModalActions.hideModal(ModalIds.LOGIN_MODAL))
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
        dispatch(registerSuccess(response.data));
        dispatch(NotificationActions.notify(response.data.message, areaIDs.AUTHENTICATION))
        dispatch(ModalActions.showModal(ModalIds.CONFIRMATION_MODAL));
      })
      .catch(err => {
        dispatch(registerFailure(err.response.data.error));
        throw new SubmissionError(err.response.data.error);
      });
  };
}

const confirmationSuccess = (user) => ({
  type: actionTypes.CONFIRMATION_SUCCESS,
  user,
});

const confirmationFailure = (error) => ({
  type: actionTypes.CONFIRMATION_FAILURE,
  error,
});

export function confirm(confirmationParams) {
  return dispatch => {
    return AuthenticationSources.confirm(confirmationParams.toJS())
      .then(response => {
        dispatch(confirmationSuccess(response.data));
        dispatch(NotificationActions.notify(response.data.message))
        dispatch(ModalActions.hideModal(ModalIds.CONFIRMATION_MODAL));
      })
      .catch(err => {
        dispatch(confirmationFailure(err.response.data.error));
        throw new SubmissionError({ _error: err.response.data.error });
      });
  }
}

const resendConfirmationSuccess = (user) => ({
  type: actionTypes.RESEND_CONFIRMATION_SUCCESS,
  user,
});

const resendConfirmationFailure = (error) => ({
  type: actionTypes.RESEND_CONFIRMATION_FAILURE,
  error,
});

export function resendConfirmation(resendConfirmation) {
  return dispatch => {
    return AuthenticationSources.resendConfirmation(resendConfirmation.toJS())
      .then(response => {
        dispatch(NotificationActions.notify(response.data.message, areaIDs.AUTHENTICATION))
        dispatch(ModalActions.showModal(ModalIds.CONFIRMATION_MODAL));
      })
      .catch(err => {
        dispatch(resendConfirmationFailure(err.response.data.error));
        throw new SubmissionError({ _error: err.response.data.error });
      });
  }
}
