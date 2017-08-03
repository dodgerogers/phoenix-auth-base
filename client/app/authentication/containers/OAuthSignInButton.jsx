import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { oAuthSignIn } from 'redux-oauth';


const OAuthSignInButton = (props) => {
  const handleClick = () => {
    const { provider, dispatch } = props;
    dispatch(oAuthSignIn({ provider }));
  };

  return (
    <Button
      onClick={handleClick}
      {...props}
    >
      {props.children}
    </Button>
  );
}

OAuthSignInButton.propTypes = {
  provider: PropTypes.string.isRequired,
  children: PropTypes.node,
  dispatch: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

OAuthSignInButton.defaultProps = {
  children: <span>OAuth Sign In</span>,
  icon: null
};

function mapStateToProps({ auth }, ownProps) {
  return {
    disabled: auth.getIn(['user', 'isSignedIn']),
    loading: auth.getIn(['oAuthSignIn', ownProps.provider, 'loading']),
  }
}

export default connect(mapStateToProps, null)(OAuthSignInButton);
