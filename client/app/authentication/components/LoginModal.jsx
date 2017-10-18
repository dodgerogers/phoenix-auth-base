import React from 'react'
import PropTypes from 'prop-types';
import { Button, Header, Image, Modal, Icon, Message } from 'semantic-ui-react'
import LoginForm from './LoginForm'


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
        <LoginForm {...props} />
      </Modal.Content>
      <Modal.Actions>
        <a href='#'>Sign Up</a>
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
