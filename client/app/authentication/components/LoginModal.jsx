import React from 'react'
import PropTypes from 'prop-types';
import { Button, Divider, Header, Image, Modal, Icon, Message } from 'semantic-ui-react'
import OAuthSignInButton from '../containers/OAuthSignInButton';
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
        <OAuthSignInButton
          fluid={true}
          color="facebook"
          provider="facebook"
        >
          <Icon name='facebook' /> Facebook
        </OAuthSignInButton>
        <div style={{ height: '5px' }} />
        <OAuthSignInButton
          fluid={true}
          color="google plus"
          provider="google_oauth2"
        >
          <Icon name='google' /> Google
        </OAuthSignInButton>
        <Divider horizontal>Or</Divider>
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
