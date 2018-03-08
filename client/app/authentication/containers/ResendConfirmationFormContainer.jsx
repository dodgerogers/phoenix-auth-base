import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ResendConfirmationForm from '../components/ResendConfirmationForm';
import * as AuthenticationSources from '../sources';
import { resendConfirmationSuccess } from '../actions';
import { formIDs } from '../constants';


function onSubmit(formData) {
  return AuthenticationSources.resendConfirmation(formData.toJS())
    .catch(err => handleFormErrors(err.response.data.error));
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    onSubmit: onSubmit,
    onSubmitSuccess: dispatchProps.resendConfirmationSuccess,
  });
}

export const Form = reduxForm({ form: formIDs.RESEND_CONFIRMATION })(ResendConfirmationForm);
export default connect(null, { resendConfirmationSuccess }, mergeProps)(Form);
