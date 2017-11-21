import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmationForm from '../components/ConfirmationForm';
import { confirm as onSubmit } from '../actions';

export default connect(null, { onSubmit })(ConfirmationForm);
