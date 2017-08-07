import React from 'react';
import { connect } from 'react-redux';
import functional from 'react-functional';
import { initialize } from 'redux-oauth';
import NavbarContainer from '../containers/NavbarContainer';
import ModalsContainer from '../../common/modals/containers/ModalsContainer';
import Footer from './Footer';


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
    <NavbarContainer {...props} />
    <div className="main">
      {props.children}
    </div>
    <Footer {...props} />
    <ModalsContainer />
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
