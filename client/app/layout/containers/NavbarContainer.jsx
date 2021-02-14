import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import currentUser from "../../hocs/CurrentUser";
import Navbar from "../components/Navbar";
import { signOutRequest } from "../../authentication/actions";

const NavbarContainer = (props) => {
  return <Navbar signOut={props.signOut} {...props} />;
};

NavbarContainer.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export { NavbarContainer as PureComponent };
export default connect(null, { signOut: signOutRequest })(
  currentUser(NavbarContainer)
);
