import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RegistrationForm from '../components/RegistrationForm';
import { register as onSubmit } from '../actions';

export default connect(null, { onSubmit })(RegistrationForm);
