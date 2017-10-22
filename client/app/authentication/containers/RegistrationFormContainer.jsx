import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable'
import RegistrationForm from '../components/RegistrationForm';

export default reduxForm({ form: 'registration' })(RegistrationForm);
