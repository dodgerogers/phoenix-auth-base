import React from 'react';
import { connect } from 'react-redux';
import functional from 'react-functional';
import styled from 'styled-components';
import { authenticate } from '../../authentication/actions';
import NavbarContainer from '../containers/NavbarContainer';
import ModalsContainer from '../../common/modals/containers/ModalsContainer';
import { GlobalNotifications } from '../../common/Notifications';
import Footer from './Footer';


const StyledBaseLayout = styled.div`
  &&&&& {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
`;

const StyledMainSection = styled.div`
  &&&&& {
    flex: 1
  }
`

const BaseLayout = (props) => (
  <StyledBaseLayout>
    <NavbarContainer {...props} />
    <GlobalNotifications />
    <StyledMainSection>
      {props.children}
    </StyledMainSection>
    <Footer {...props} />
    <ModalsContainer />
  </StyledBaseLayout>
);

const opts = {
  componentWillMount: props => props.authenticate(),
};

export { BaseLayout as PureComponent };
export const FunctionalComponent = functional(BaseLayout, opts);
export default connect(null, { authenticate })(FunctionalComponent);
