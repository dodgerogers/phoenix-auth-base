import React from 'react'
import PropTypes from 'prop-types';
import AuthenticationModal from './AuthenticationModal';
import RegistrationFormContainer from '../containers/RegistrationFormContainer'
import AuthenticationLinks from './AuthenticationLinks';


const RegistrationFormModal = (props) => {
  return (
    <AuthenticationModal title="Create an account" {...props}>
      <RegistrationFormContainer {...props} />
      <AuthenticationLinks />
    </AuthenticationModal>
  );
}

export default RegistrationFormModal;
