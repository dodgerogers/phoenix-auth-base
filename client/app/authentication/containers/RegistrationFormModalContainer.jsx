import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import functional from 'react-functional';
import RegistrationFormModal from '../components/RegistrationFormModal';
import { modalIds } from '../../common/modals/modalConstants';

function mapStateToProps({ auth }, ownProps) {
  return {
    isSignedIn: auth.getIn(['user', 'isSignedIn']),
  }
}

const options = {
  // Hide the modal based on something
}

export const FunctionalComponent = functional(RegistrationFormModal, options);
export default connect(mapStateToProps, null)(FunctionalComponent);
