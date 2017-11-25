import React from 'react'
import PropTypes from 'prop-types';
import { Button, Divider, Header, Image, Modal, Icon, Message } from 'semantic-ui-react';
import ResendConfirmationFormContainer from '../containers/ResendConfirmationFormContainer';


const ResendConfirmationModal = (props) => {
  return (
    <Modal
      size="mini"
      dimmer={false}
      open={props.show}
      closeOnDocumentClick={true}
      onClose={props.close}
      >
      <Modal.Header as="h2">
        Resend confirmation
      </Modal.Header>
      <Modal.Content>
        <ResendConfirmationFormContainer {...props} />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.close}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

ResendConfirmationModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func.isRequired,
}

export default ResendConfirmationModal;
