import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form/immutable';
import SignInForm from '../components/SignInForm';
import * as AuthenticationSources from '../sources';
import { formIDs } from '../constants';
import { signInSuccess } from '../actions';


function onSubmit(formData) {
  return AuthenticationSources.login(formData.toJS())
    .catch(err => {
      throw new SubmissionError({ _error: err.response.data.error });
    });
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    onSubmit: onSubmit,
    onSubmitSuccess: dispatchProps.signInSuccess,
  });
}

export const Form = reduxForm({ form: formIDs.SIGN_IN })(SignInForm);
export default connect(null, { signInSuccess }, mergeProps)(Form);
