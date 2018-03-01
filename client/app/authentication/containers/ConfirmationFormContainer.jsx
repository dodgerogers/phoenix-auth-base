import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ConfirmationForm from '../components/ConfirmationForm';
import * as AuthenticationSources from '../sources';
import { confirmationSuccess } from '../actions';
import { formIDs } from '../constants';
import handleFormErrors from '../../lib/utils/handleFormErrors';


function onSubmit(formData) {
  return AuthenticationSources.confirm(formData.toJS())
    .catch(err => handleFormErrors(err.response.data.error));
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    onSubmit: onSubmit,
    onSubmitSuccess: dispatchProps.confirmationSuccess,
  });
}

export const Form = reduxForm({ form: formIDs.CONFIRMATION })(ConfirmationForm);
export default connect(null, { confirmationSuccess }, mergeProps)(Form);
