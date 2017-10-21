import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { showModal } from '../../common/modals/actions/modalActions';
import { modalIds } from '../../common/modals/modalConstants';

 // TODO: Turn this into a modal trigger component
const RegistrationButtonContainer = (props) => {
  const showSignUpModal = () => props.showModal(modalIds.registrationModal);
  const Wrapper = props.wrapper;

  return (
    <Wrapper onClick={showSignUpModal}>
      Sign up
    </Wrapper>
  );
}

RegistrationButtonContainer.propTypes = {
  showModal: PropTypes.func.isRequired,
};

export { RegistrationButtonContainer as PureComponent };
export default connect(null, { showModal })(RegistrationButtonContainer);
