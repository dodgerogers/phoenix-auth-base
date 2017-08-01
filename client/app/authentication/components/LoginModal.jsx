import React from 'react'
import { Button, Header, Image, Modal, Icon, Message } from 'semantic-ui-react'
import LoginForm from './LoginForm'

const LoginModal = (props) => (
  <Modal
    size="mini"
    dimmer={false}
    closeOnDocumentClick={true}
    trigger={props.trigger}
  >
    <Modal.Header as="h2">
      Login
    </Modal.Header>
    <Modal.Content>
      <LoginForm {...props} />
    </Modal.Content>
    <Modal.Actions>
      <a href='#'>Sign Up</a>
      <Button>
        Close
      </Button>
    </Modal.Actions>
  </Modal>
);

export default LoginModal
