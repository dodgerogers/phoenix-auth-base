import React from 'react'
import PropTypes from 'prop-types';
import AuthenticationModal from './AuthenticationModal';
import ResetPasswordFormContainer from '../containers/ResetPasswordFormContainer';
import AuthenticationLinks, { links } from './AuthenticationLinks';


const ResetPasswordModal = props => {
  return (
    <AuthenticationModal title="Reset your password" {...props}>
      <ResetPasswordFormContainer {...props} />
      <AuthenticationLinks exclude={[links.RESET_PASSWORD]} />
    </AuthenticationModal>
  );
}

export default ResetPasswordModal;
