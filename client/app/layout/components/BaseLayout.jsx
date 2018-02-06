import React from 'react';
import { connect } from 'react-redux';
import functional from 'react-functional';
import { authenticate } from '../../authentication/actions';
import NavbarContainer from '../containers/NavbarContainer';
import ModalsContainer from '../../common/modals/containers/ModalsContainer';
import { GlobalNotifications } from '../../common/Notifications';
import Footer from './Footer';


const BaseLayout = (props) => (
  <div className="BaseLayout">
    <NavbarContainer {...props} />
    <GlobalNotifications />
    <div className="main">
      {props.children}
    </div>
    <Footer {...props} />
    <ModalsContainer />
  </div>
);

const opts = {
  componentWillMount: props => props.authenticate(),
};

export { BaseLayout as PureComponent };
export const FunctionalComponent = functional(BaseLayout, opts);
export default connect(null, { authenticate })(FunctionalComponent);
