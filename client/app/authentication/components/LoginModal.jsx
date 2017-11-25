import React from 'react'
import PropTypes from 'prop-types';
import { Button, Divider, Header, Image, Modal, Icon, Message } from 'semantic-ui-react';
import LoginFormContainer from '../containers/LoginFormContainer';
import AuthenticationLinks from './AuthenticationLinks';


const LoginModal = (props) => {
  return (
    <Modal
      size="mini"
      dimmer={false}
      open={props.show}
      closeOnDocumentClick={true}
      onClose={props.close}
      >
      <Modal.Header as="h2">
        Login
      </Modal.Header>
      <Modal.Content>
        <LoginFormContainer {...props} />
        <AuthenticationLinks />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.close}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

LoginModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func.isRequired,
}

export default LoginModal;
