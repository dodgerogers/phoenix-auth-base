import React from 'react';
import { connect } from 'react-redux';
import functional from 'react-functional';
import { initialize } from 'redux-oauth';
import NavbarContainer from '../containers/NavbarContainer';
import ModalsContainer from '../../common/modals/containers/ModalsContainer';
import Footer from './Footer';
import { reduxOauthConfig } from '../constants/reduxOauth';


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
  componentWillMount: (props) => props.initialize(reduxOauthConfig),
}

export { BaseLayout as PureComponent };
export const FunctionalComponent = functional(BaseLayout, options);
export default connect(null, { initialize })(FunctionalComponent);
