import React from 'react'
import PropTypes from 'prop-types';
import AuthenticationModal from './AuthenticationModal';
import ResendConfirmationFormContainer from '../containers/ResendConfirmationFormContainer';
import AuthenticationLinks, { links } from './AuthenticationLinks';


const ResendConfirmationModal = (props) => {
  return (
    <AuthenticationModal title="Resend confirmation email" {...props}>
      <ResendConfirmationFormContainer {...props} />
      <AuthenticationLinks exclude={[links.RESEND_CONFIRMATION]} />
    </AuthenticationModal>
  );
}

export default ResendConfirmationModal;
