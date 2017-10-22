import {
  fetch,
  authenticateStart,
  authenticateComplete,
  authenticateError,
} from 'redux-oauth';
import * as AuthenticationSources from '../sources/AuthenticationSources';


function signIn(signUpParams) {
  return dispatch => {
    dispatch(authenticateStart());

    return AuthenticationSources.register(signUpParams)
      .then(user => dispatch(authenticateComplete(user))
      .catch(response => {
        if (response.errors) {
          dispatch(authenticateError(response.errors));
        }
      };
  };
}
