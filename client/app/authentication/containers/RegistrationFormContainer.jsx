import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import RegistrationForm from '../components/RegistrationForm';
import * as AuthenticationSources from '../sources';
import { registerSuccess } from '../actions';
import { formIDs } from '../constants';
import handleFormErrors from '../../lib/utils/handleFormErrors';


function onSubmit(formData) {
  return AuthenticationSources.register(formData.toJS())
    .catch(err => handleFormErrors(err.response.data.error));
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    onSubmit: onSubmit,
    onSubmitSuccess: dispatchProps.registerSuccess,
  });
}

export const Form = reduxForm({ form: formIDs.REGISTRATION })(RegistrationForm);
export default connect(null, { registerSuccess }, mergeProps)(Form);
