import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { formIDs } from '../../constants/form';


export const Form = reduxForm({ form: formIDs.PASSWORD_RESET })(ResetPasswordForm);
export default connect(null, null)(Form);
