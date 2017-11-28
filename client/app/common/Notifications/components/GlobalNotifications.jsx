import React from 'react'
import PropTypes from 'prop-types';
import NotificationsContainer from '../containers/NotificationsContainer';
import { areaIDs } from '../constants';
import styled from 'styled-components';

const NotificationWrapper = styled.div`
  position: fixed;
  margin-top: 80px;
  margin-left: -25%;
  max-height: 50%;
  width: 50%;
  left: 50%;
  z-index: 100;
`;

const GlobalNotifications = (props) => {
  return (
    <NotificationWrapper>
      <NotificationsContainer id={areaIDs.APPLICATION} />
    </NotificationWrapper>
  );
}

export default GlobalNotifications;
