import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { connect } from "react-redux";
import functional from "react-functional";
import { Message } from "semantic-ui-react";
import * as NotificationActions from "../actions";

const Notification = (props) => {
  const { notification, onDestroy } = props;
  const message = notification.get("message");
  const level = notification.get("level");
  const levelProps = level ? { [level]: true } : {};

  return (
    <Message onDismiss={onDestroy} {...levelProps}>
      {message}
    </Message>
  );
};

Notification.propTypes = {
  onDestroy: PropTypes.func.isRequired,
  notification: ImmutablePropTypes.mapContains({
    message: PropTypes.string.isRequired,
    level: PropTypes.string,
  }),
};

const opts = {
  componentDidMount: (props) => setTimeout(props.onDestroy, 5000),
};

export { Notification as PureComponent };
export const FunctionalComponent = functional(Notification, opts);
export default connect(null, NotificationActions)(FunctionalComponent);
