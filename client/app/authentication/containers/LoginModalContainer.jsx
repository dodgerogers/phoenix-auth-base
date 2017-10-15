import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import functional from 'react-functional';
import LoginModal from '../components/LoginModal';
import { hideModal } from '../../common/modals/actions/modalActions';
import { modalIds } from '../../common/modals/modalConstants';


function mapStateToProps({ auth }, ownProps) {
  return {
    isSignedIn: auth.getIn(['user', 'isSignedIn']),
  }
}

const options = {
  componentDidUpdate: (prevProps, nextProps) => {
    if (!prevProps.isSignedIn && nextProps.isSignedIn) {
      props.hideModal(modalIds.loginModal);
    }
  }
}

export default connect(mapStateToProps, { hideModal })(functional(LoginModal, options));
