import React from 'react'
import PropTypes from 'prop-types';
import AuthenticationModal from './AuthenticationModal';
import SignInFormContainer from '../containers/SignInFormContainer';
import AuthenticationLinks from './AuthenticationLinks';


const SignInModal = (props) => {
  return (
    <AuthenticationModal title="Login" {...props}>
      <SignInFormContainer {...props} />
      <AuthenticationLinks />
    </AuthenticationModal>
  );
}

export default SignInModal;
