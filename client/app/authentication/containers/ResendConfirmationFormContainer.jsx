import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResendConfirmationForm from '../components/ResendConfirmationForm';
import { resendConfirmation as onSubmit } from '../actions';

export default connect(null, { onSubmit })(ResendConfirmationForm);
