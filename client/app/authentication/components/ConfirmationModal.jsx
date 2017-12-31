import React from 'react'
import PropTypes from 'prop-types';
import AuthenticationModal from './AuthenticationModal';
import ConfirmationFormContainer from '../containers/ConfirmationFormContainer';
import AuthenticationLinks, { links } from './AuthenticationLinks';


const ConfirmationModal = (props) => {
  return (
    <AuthenticationModal title="Confirm your account" {...props}>
      <ConfirmationFormContainer {...props} />
      <AuthenticationLinks exclude={[links.CONFIRMATION]} />
    </AuthenticationModal>
  );
}

export default ConfirmationModal;
