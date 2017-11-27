import React from 'react'
import PropTypes from 'prop-types';
import AuthenticationModal from './AuthenticationModal';
import ConfirmationFormContainer from '../containers/ConfirmationFormContainer';
import AuthenticationLinks from './AuthenticationLinks';


const ConfirmationModal = (props) => {
  return (
    <AuthenticationModal title="Confirm your account" {...props}>
      <ConfirmationFormContainer {...props} />
      <AuthenticationLinks />
    </AuthenticationModal>
  );
}

export default ConfirmationModal;
