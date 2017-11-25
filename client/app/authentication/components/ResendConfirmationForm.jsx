import React from 'react'
import { Field } from 'redux-form/immutable';
import { reduxForm } from 'redux-form/immutable';
import { Form, Message, Button, Icon } from 'semantic-ui-react';
import Input from '../../common/components/Input';
import { isRequired, isEmail } from '../../lib/utils/validation';
import { formIDs } from '../constants';


const ResendConfirmationForm = (props) => {
  const { handleSubmit, error, submitting, dirty } = props;

  return (
    <div className="resend-confirmation-form">
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

export { ResendConfirmationForm as PureComponent };
export default reduxForm({ form: formIDs.RESEND_CONFIRMATION })(ResendConfirmationForm);
