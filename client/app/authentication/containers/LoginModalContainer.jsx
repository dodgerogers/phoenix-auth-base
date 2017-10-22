import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import functional from 'react-functional';
import LoginModal from '../components/LoginModal';
import { ModalIds } from '../../common/modals';

function mapStateToProps({ auth }, ownProps) {
  return {
    isSignedIn: auth.getIn(['user', 'isSignedIn']),
  }
}

const options = {
  componentDidUpdate: (nextProps, prevProps) => {
    if (!prevProps.isSignedIn && nextProps.isSignedIn) {
      nextProps.close(ModalIds.loginModal);
    }
  }
}

export const FunctionalComponent = functional(LoginModal, options);
export default connect(mapStateToProps, null)(FunctionalComponent);
