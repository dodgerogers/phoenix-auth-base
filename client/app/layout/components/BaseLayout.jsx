import React from 'react';
import { connect } from 'react-redux';
import functional from 'react-functional';
import { initialize } from 'redux-oauth';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';


const reduxOauthConfig = {
  backend: {
    apiUrl: window.location.href,
    signOutPath:  null,
    cleanSession: false,
    clientOnly: true,
    tokenValidationPath: 'api/validate_token',
    authProviderPaths: {
      facebook: 'auth/facebook',
      google: 'auth/google_oauth2',
    },
  },
  cookies: document.cookie,
  currentLocation: document.URL
};

const BaseLayout = (props) => (
  <div className="BaseLayout">
    <Navbar {...props} />
    <div className="main">
      {props.children}
    </div>
    <Footer {...props} />
  </div>
);

const options = {
  componentWillMount: (props) => {
    const { dispatch } = props;
    const action = initialize(reduxOauthConfig);
    dispatch(action);
  },
}

export default connect(null, null)(functional(BaseLayout, options));
