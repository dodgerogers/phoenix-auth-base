import React from 'react';
import { connect } from 'react-redux';
import functional from 'react-functional';
import NavbarContainer from '../containers/NavbarContainer';
import ModalsContainer from '../../common/modals/containers/ModalsContainer';
import Footer from './Footer';


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

export default BaseLayout;
