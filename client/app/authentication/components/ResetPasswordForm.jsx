import React from 'react'
import { Field } from 'redux-form/immutable';
import { Form, Message, Button, Icon } from 'semantic-ui-react';
import Input from '../../common/components/Input';
import { isEmail, isRequired, minLength, matchField } from '../../lib/utils/validation';

const minPasswordLength = minLength(8);
const passwordsMustMatch = matchField('password');


const ResetPasswordForm = (props) => {
  const { handleSubmit, error, submitting, dirty } = props;

  return (
    <div className="reset-password-form">
      <Form
        size='large'
        loading={submitting}
        onSubmit={handleSubmit}
      >
        {error && dirty && <Message negative>{error}</Message>}
        <Field
          component={Input}
          fluid={true}
          name="email"
          icon="mail"
          iconPosition="left"
          placeholder="Email"
          validate={[isRequired, isEmail]}
        />
        <Field
          component={Input}
          fluid={true}
          name="resetPasswordToken"
          placeholder="Reset Password Token"
          validate={[isRequired]}
        />
        <Field
          component={Input}
          fluid={true}
          name="password"
          icon="lock"
          type="password"
          iconPosition="left"
          placeholder="New Password"
          validate={[isRequired, minPasswordLength]}
        />
        <Field
          component={Input}
          fluid={true}
          name="passwordConfirmation"
          type="password"
          icon="lock"
          iconPosition="left"
          placeholder="Password Confirmation"
          validate={[isRequired, passwordsMustMatch]}
        />
        <Button
          type="submit"
          fluid={true}
          color="teal"
          disabled={!props.valid}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ResetPasswordForm;
