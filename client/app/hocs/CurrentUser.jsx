import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';


const CurrentUser = (ComposedComponent, opts = {}) => {
  const Wrapper = (props) => (
    <ComposedComponent currentUser={props.currentUser} {...props} />
  );

  function mapStateToProps({ auth }) {
    return {
      currentUser: auth.getIn(['user', 'attributes']),
    };
  }

  Wrapper.propTypes = {
    currentUser: ImmutablePropTypes.map,
  };

  return connect(mapStateToProps, null)(Wrapper);
}

export default CurrentUser;
