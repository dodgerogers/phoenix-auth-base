import React from 'react';
import PropTypes from 'prop-types';
import { connect, bindActionCreators } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { login as onSubmit } from '../actions';

export default connect(null, { onSubmit })(LoginForm);
