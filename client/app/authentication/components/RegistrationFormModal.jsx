import React from 'react'
import PropTypes from 'prop-types';
import { Button, Header, Image, Modal, Icon, Message } from 'semantic-ui-react'
import RegistrationFormContainer from '../containers/RegistrationFormContainer'


const RegistrationFormModal = (props) => {
  return (
    <Modal
      size="mini"
      dimmer={false}
      open={props.show}
      onClose={props.close}
      closeOnDocumentClick={true}
      >
      <Modal.Header as="h2">
        Sign up
      </Modal.Header>
      <Modal.Content>
        <RegistrationFormContainer {...props} />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.close}>
          Close
        </Button>
        <Button color="teal" onClick={props.onSubmit}>
          Create account
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

RegistrationFormModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
}

export default RegistrationFormModal;
