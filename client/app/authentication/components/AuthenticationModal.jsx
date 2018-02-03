import React from 'react'
import PropTypes from 'prop-types';
import { Button, Divider, Modal, Message } from 'semantic-ui-react';
import { NotificationsContainer, areaIDs } from '../../common/Notifications';


const AuthenticationModal = (props) => {
  return (
    <Modal
      dimmer={true}
      open={props.show}
      onClose={props.close}
      size="mini"
      >
      <Modal.Header as="h2">
        {props.title}
      </Modal.Header>
      <Modal.Content>
        <NotificationsContainer id={areaIDs.AUTHENTICATION} />
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
