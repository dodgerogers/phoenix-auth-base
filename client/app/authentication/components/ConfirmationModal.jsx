import React from 'react'
import PropTypes from 'prop-types';
import { Button, Divider, Header, Image, Modal, Icon, Message } from 'semantic-ui-react';
import ConfirmationFormContainer from '../containers/ConfirmationFormContainer';


const ConfirmationModal = (props) => {
  return (
    <Modal
      size="mini"
      dimmer={false}
      open={props.show}
      closeOnDocumentClick={true}
      onClose={props.close}
      >
      <Modal.Header as="h2">
        Confirm Account
      </Modal.Header>
      <Modal.Content>
        <ConfirmationFormContainer {...props} />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.close}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func.isRequired,
}

export default ConfirmationModal;
