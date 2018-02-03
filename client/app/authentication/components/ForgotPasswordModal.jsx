import React from 'react'
import PropTypes from 'prop-types';
import AuthenticationModal from './AuthenticationModal';
import ForgotPasswordFormContainer from '../containers/ForgotPasswordFormContainer';
import AuthenticationLinks, { links } from './AuthenticationLinks';


const ForgotPasswordModal = props => {
  return (
    <AuthenticationModal title="Forgot your password" {...props}>
      <ForgotPasswordFormContainer {...props} />
      <AuthenticationLinks exclude={[links.FORGOT_PASSWORD]} />
    </AuthenticationModal>
  );
}

export default ForgotPasswordModal;
