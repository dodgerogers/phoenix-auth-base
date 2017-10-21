import React from 'react'
import OAuthSignInButton from '../containers/OAuthSignInButton';
import { Form, Header, Divider, Button, Icon } from 'semantic-ui-react';


function LoginForm(props) {
  return (
    <div className="login-form">
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
      <Form size='large'>
        <Form.Input
          fluid
          icon='mail'
          iconPosition='left'
          placeholder='Email'
        />
        <Form.Input
          fluid
          icon='lock'
          type='password'
          iconPosition='left'
          placeholder='Password'
        />
        <Button fluid size='large' color="teal">Login</Button>
      </Form>
    </div>
  );
}

export default LoginForm;
