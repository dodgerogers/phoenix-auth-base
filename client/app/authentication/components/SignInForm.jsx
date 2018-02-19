import React from 'react'
import { Field } from 'redux-form/immutable';
import { Form, Message, Button, Icon } from 'semantic-ui-react';
import Input from '../../common/components/Input';
import { isRequired, isEmail } from '../../lib/utils/validation';


const SignInForm = (props) => {
  const { handleSubmit, error, submitting, dirty } = props;

  return (
    <div className="login-form">
      <Form
        size='large'
        loading={submitting}
        onSubmit={handleSubmit}
      >
        {error && dirty && <Message negative>{error}</Message>}
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
          type="password"
          iconPosition="left"
          placeholder="Password"
          validate={[isRequired]}
        />
        <Button
          type="submit"
          fluid={true}
          color="teal"
          disabled={!props.valid}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default SignInForm;
