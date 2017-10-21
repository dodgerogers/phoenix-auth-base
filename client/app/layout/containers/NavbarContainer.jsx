import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import currentUser from '../../hocs/CurrentUser';
import Navbar from '../components/Navbar';
import { signOut } from 'redux-oauth';


const NavbarContainer = (props) => {
  return (
    <Navbar signOut={props.signOut} {...props} />
  );
}

NavbarContainer.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export { NavbarContainer as PureComponent };
export default connect(null, { signOut })(currentUser(NavbarContainer));
