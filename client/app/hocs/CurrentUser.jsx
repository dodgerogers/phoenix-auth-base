import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';


const CurrentUser = (ComposedComponent, opts = {}) => {
  const Wrapper = (props) => (
    <ComposedComponent currentUser={props.currentUser}
      currentProfile={props.currentProfile} {...props} />
  );

  function mapStateToProps({ authentication }) {
    return {
      currentUser: authentication.get('currentUser'),
      currentProfile: authentication.get('currentProfile'),
    };
  }

  Wrapper.propTypes = {
    currentUser: ImmutablePropTypes.map,
    currentProfile: ImmutablePropTypes.map,
  };

  return connect(mapStateToProps, null)(Wrapper);
}

export default CurrentUser;
