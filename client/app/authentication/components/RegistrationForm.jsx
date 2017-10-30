import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { Form, Message, Button, Icon } from 'semantic-ui-react';
import Input from '../../common/components/Input';
import { isRequired, isEmail } from '../../lib/utils/validation';


function RegistrationForm(props) {
  const { handleSubmit, onSubmit, errorMessage, isSubmitting } = props;

  return (
    <div className="sign-up-form">
      <Form size='large' loading={isSubmitting}>
        {errorMessage && <Message negative>{errorMessage}</Message>}
        <Field
          component={Input}
          fluid
          name="username"
          icon="user"
          iconPosition="left"
          placeholder="Display Name"
          validate={[isRequired]}
        />
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
        <Field
          component={Input}
          fluid
          name="password-confirmation"
          placeholder="Password Confirmation"
          validate={[isRequired]}
        />
      </Form>
    </div>
  );
}

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
  isSubmitting: PropTypes.bool,
}

RegistrationForm.defaultProps = {
  errorMessage: null,
  isSubmitting: false,
}

export default RegistrationForm;
