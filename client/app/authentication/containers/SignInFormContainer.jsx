import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import SignInForm from '../components/SignInForm';
import * as AuthenticationSources from '../sources';
import { formIDs } from '../constants';
import { signInSuccess } from '../actions';
import handleFormErrors from '../../lib/utils/handleFormErrors';


function onSubmit(formData) {
  return AuthenticationSources.login(formData.toJS())
    .catch(err => handleFormErrors(err.response.data.error));
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    onSubmit: onSubmit,
    onSubmitSuccess: response => dispatchProps.signInSuccess(response.data.accessToken),
  });
}

export const Form = reduxForm({ form: formIDs.SIGN_IN })(SignInForm);
export default connect(null, { signInSuccess }, mergeProps)(Form);
