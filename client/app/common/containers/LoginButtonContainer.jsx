import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { showModal } from '../../common/modals/actions/modalActions';
import { modalIds } from '../../common/modals/modalConstants';


const LoginButtonContainer = (props) => {
  const showLoginModal = () => props.showModal(modalIds.loginModal);
  const Wrapper = props.wrapper;

  return (
    <Wrapper onClick={showLoginModal}>
      Login
    </Wrapper>
  )
}

LoginButtonContainer.propTypes = {
  showModal: PropTypes.func.isRequired,
};

export { LoginButtonContainer as PureComponent };
export default connect(null, { showModal })(LoginButtonContainer);
