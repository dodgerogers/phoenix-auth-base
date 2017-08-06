import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { oAuthSignIn } from 'redux-oauth';


const OAuthSignInButton = (props) => {
  const handleClick = () => {
    const { provider } = props;
    props.oAuthSignIn({ provider });
  };

  return (
    <Button
      fluid={props.fluid}
      color={props.color}
      loading={props.loading}
      disabled={props.disabled}
      onClick={handleClick}
    >
      {props.children}
    </Button>
  );
}

OAuthSignInButton.propTypes = {
  oAuthSignIn: PropTypes.func.isRequired,
  provider: PropTypes.string.isRequired,
  children: PropTypes.node,
  dispatch: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fluid: PropTypes.bool,
  color: PropTypes.string,
};

OAuthSignInButton.defaultProps = {
  children: <span>OAuth Sign In</span>,
};

function mapStateToProps({ auth }, ownProps) {
  return {
    disabled: auth.getIn(['user', 'isSignedIn']),
    loading: auth.getIn(['oAuthSignIn', ownProps.provider, 'loading']),
  }
}

export { OAuthSignInButton as PureComponent };
export default connect(mapStateToProps, { oAuthSignIn })(OAuthSignInButton);
