import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';


const CurrentUser = (ComposedComponent, opts = {}) => {
  const Wrapper = (props) => {
    const isSignedIn = props.currentUser !== null && props.currentProfile !== null;
    return (
      <ComposedComponent
        currentUser={props.currentUser}
        currentProfile={props.currentProfile}
        isSignedIn={isSignedIn}
        {...props} />
    );
  }

  function mapStateToProps({ accounts }) {
    return {
      currentUser: accounts.get('currentUser'),
      currentProfile: accounts.get('currentProfile'),
    };
  }

  Wrapper.propTypes = {
    isSignedIn: PropTypes.bool,
    currentUser: ImmutablePropTypes.map,
    currentProfile: ImmutablePropTypes.map,
  };

  return connect(mapStateToProps, null)(Wrapper);
}

export default CurrentUser;
