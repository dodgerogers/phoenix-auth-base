import React from 'react'
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Message } from 'semantic-ui-react';
import styled from 'styled-components';
import Notification from './Notification';


const NotificationWrapper = styled.div`
  margin-bottom: 10px;
`;

const NotificationList = (props) => {
  const renderNotification = (notification, index) => {
    return (
      <Notification
        key={index}
        notification={notification}
        onDestroy={() => props.destroy(props.id, index)}
      />
    );
  };

  if (props.notifications && props.notifications.size > 0) {
    return (
      <NotificationWrapper>
        {props.notifications.map((n, index) => renderNotification(n, index))}
      </NotificationWrapper>
    );
  }

  return (<noscript />);
}

NotificationList.propTypes = {
  id: PropTypes.string.isRequired,
  notifications: ImmutablePropTypes.list.isRequired,
  destroy: PropTypes.func.isRequired,
};

export default NotificationList;
