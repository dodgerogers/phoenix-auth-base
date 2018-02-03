import React from 'react'
import PropTypes from 'prop-types';
import AuthenticationModal from './AuthenticationModal';
import LoginFormContainer from '../containers/LoginFormContainer';
import AuthenticationLinks from './AuthenticationLinks';


const LoginModal = (props) => {
  return (
    <AuthenticationModal title="Login" {...props}>
      <LoginFormContainer {...props} />
      <AuthenticationLinks />
    </AuthenticationModal>
  );
}

export default LoginModal;
