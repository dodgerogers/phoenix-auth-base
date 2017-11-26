import React from 'react'
import PropTypes from 'prop-types';
import AuthenticationModal from './AuthenticationModal';
import ConfirmationFormContainer from '../containers/ConfirmationFormContainer';


const ConfirmationModal = (props) => {
  return (
    <AuthenticationModal title="Confirm your account" {...props}>
      <ConfirmationFormContainer {...props} />
    </AuthenticationModal>
  );
}

export default ConfirmationModal;
