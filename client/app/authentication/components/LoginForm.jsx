import React from 'react'
import { Form, Header, Divider, Button, Icon } from 'semantic-ui-react';


function LoginForm(props) {
  return (
    <div className="LoginForm">
      <Button fluid={true} color='facebook'>
        <Icon name='facebook' /> Facebook
      </Button>
      <div style={{ height: '5px' }} />
      <Button fluid={true} color='google plus'>
        <Icon name='google' /> Google
      </Button>
      <Divider horizontal>Or</Divider>
      <Form size='large'>
        <Form.Input
          fluid
          icon='user'
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
