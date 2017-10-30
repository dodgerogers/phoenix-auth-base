import React from 'react'
import { Field } from 'redux-form/immutable';
import { Form, Message, Button, Icon } from 'semantic-ui-react';
import Input from '../../common/components/Input';
import { isRequired, isEmail } from '../../lib/utils/validation';


const LoginForm = (props) => {
  const { handleSubmit, onSubmit, errorMessage, isSubmitting } = props;

  return (
    <div className="login-form">
      <Form size='large' loading={isSubmitting}>
        {errorMessage && <Message negative>{errorMessage}</Message>}
        <Field
          component={Input}
          fluid
          name="email"
          icon="mail"
          iconPosition="left"
          placeholder="Email"
          validate={[isRequired, isEmail]}
        />
        <Field
          component={Input}
          fluid
          name="password"
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          validate={[isRequired]}
        />
      </Form>
    </div>
  );
}

export default LoginForm;
