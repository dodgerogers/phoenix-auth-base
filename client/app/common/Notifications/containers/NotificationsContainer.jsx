import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NotificationList from '../components/NotificationList';
import * as NotificationActions from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    notifications: state.notifications.get(ownProps.id),
  };
};

export default connect(mapStateToProps, NotificationActions)(NotificationList);
