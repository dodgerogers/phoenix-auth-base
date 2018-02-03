import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import * as AuthenticationSources from '../sources';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { passwordResetRequestSuccess } from '../actions';
import { formIDs } from '../constants';


function onSubmit(formData, callback) {
  return AuthenticationSources.passwordResetRequest(formData.toJS())
    .catch(err => {
      throw new SubmissionError({ _error: err.response.data.error });
    });
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    onSubmit: onSubmit,
    onSubmitSuccess: dispatchProps.passwordResetRequestSuccess,
  });
}

export const Form = reduxForm({ form: formIDs.FORGOT_PASSWORD })(ForgotPasswordForm);
export default connect(null, { passwordResetRequestSuccess }, mergeProps)(Form);
