import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { reduxForm } from 'redux-form/immutable';
import { Form, Message, Button, Icon } from 'semantic-ui-react';
import Input from '../../common/components/Input';
import { isRequired, isEmail } from '../../lib/utils/validation';
import { formIDs } from '../constants';


// How to validate whilst using autofocus
function RegistrationForm(props) {
  const { handleSubmit, error, submitting, touched } = props;

  return (
    <div className="registration-form">
      <Form
        size='large'
        loading={submitting}
        onSubmit={handleSubmit}
      >
        {error && touched && <Message negative>{error}</Message>}
        <Field
          autoFocus={true}
          component={Input}
          fluid={true}
          name="name"
          icon="user"
          iconPosition="left"
          placeholder="Display Name"
          validate={[isRequired]}
        />
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
          type="password"
          name="password"
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          validate={[isRequired]}
        />
        <Field
          component={Input}
          fluid={true}
          type="password"
          name="password_confirmation"
          placeholder="Password Confirmation"
          validate={[isRequired]}
        />
        <Button
          fluid={true}
          color="teal"
          disabled={!props.valid}
        >
          Create account
        </Button>
      </Form>
    </div>
  );
}

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  error: PropTypes.string,
  submitting: PropTypes.bool,
}

export { RegistrationForm as PureComponent };
export default reduxForm({ form: formIDs.REGISTRATION })(RegistrationForm);
