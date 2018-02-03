import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form/immutable';
import * as AuthenticationSources from '../sources';
import { resetPasswordSuccess } from '../actions';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { formIDs } from '../constants';

function onSubmit(formData) {
  return AuthenticationSources.resetPassword(formData.toJS())
    .catch(err => {
      throw new SubmissionError({ _error: err.response.data.error });
    });
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    onSubmit: onSubmit,
    onSubmitSuccess: dispatchProps.resetPasswordSuccess,
  });
}

export const Form = reduxForm({ form: formIDs.PASSWORD_RESET })(ResetPasswordForm);
export default connect(null, { resetPasswordSuccess }, mergeProps)(Form);
