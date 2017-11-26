import React from 'react'
import PropTypes from 'prop-types';
import { Button, Divider, Modal, Message } from 'semantic-ui-react';
import { NotificationContainer, areaIDs } from '../../common/Notifications';


const AuthenticationModal = (props) => {
  return (
    <Modal
      size="mini"
      dimmer={false}
      open={props.show}
      closeOnDocumentClick={true}
      onClose={props.close}
      >
      <Modal.Header as="h2">
        {props.title}
      </Modal.Header>
      <Modal.Content>
        <NotificationContainer id={areaIDs.AUTHENTICATION} />
        {props.children}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.close}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

AuthenticationModal.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
}

export default AuthenticationModal;
