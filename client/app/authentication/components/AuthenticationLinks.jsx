import React from 'react'
import PropTypes from 'prop-types';
import mirrorCreator from 'mirror-creator';
import { ModalIds, ModalTrigger } from '../../common/modals';
import styled from 'styled-components';

const AuthLink = styled.div`
  margin-top: 10px;
`;

export const links = mirrorCreator([
  'LOGIN',
  'REGISTRATION',
  'CONFIRMATION',
  'RESEND_CONFIRMATION',
]);

const AuthenticationLinks = (props) => {
  const Wrapper = props => (<a href="#" {...props} />);
  const authLinksMap = {
    [links.LOGIN]: () => (
      <ModalTrigger
        text="Already registered? Login in"
        id={ModalIds.LOGIN_MODAL}
        wrapper={Wrapper}
      />
    ),
    [links.REGISTRATION]: () => (
      <ModalTrigger
        text="Create an account"
        id={ModalIds.REGISTRATION_MODAL}
        wrapper={Wrapper}
      />
    ),
    [links.CONFIRMATION]: () => (
      <ModalTrigger
        text="I have a confirmation code"
        id={ModalIds.CONFIRMATION_MODAL}
        wrapper={Wrapper}
      />
    ),
    [links.RESEND_CONFIRMATION]: () => (
      <ModalTrigger
        text="Didn't receive confirmation instructions?"
        id={ModalIds.RESEND_CONFIRMATION_MODAL}
        wrapper={Wrapper}
      />
    ),
  }

  const renderLinks = () => {
    const filterOutExcludedLink = link => props.exclude.indexOf(link) < 0;
    return Object.keys(authLinksMap).filter(filterOutExcludedLink).map(link => {
      return (
        <AuthLink key={link}>{authLinksMap[link]()}</AuthLink>
      );
    });
  }

  return (
    <div className="authentication-links">
      {renderLinks()}
    </div>
  );
}

AuthenticationLinks.propTypes = {
  exclude: PropTypes.array,
};

AuthenticationLinks.defaultProps = {
  exclude: [],
};

export default AuthenticationLinks;
