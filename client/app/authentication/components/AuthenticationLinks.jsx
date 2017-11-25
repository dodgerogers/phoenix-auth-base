import React from 'react'
import { ModalIds, ModalTrigger } from '../../common/modals';
import styled from 'styled-components';

const AuthLink = styled.div`
  margin-top: 10px;
`;

const AuthenticationLinks = (props) => {
  const Wrapper = (props) => (<a href="#" {...props} />);

  return (
    <div className="authentication-links">
      <AuthLink>
        <ModalTrigger
          key="confirmation"
          text="I have a confirmation code"
          id={ModalIds.CONFIRMATION_MODAL}
          wrapper={Wrapper}
        />
      </AuthLink>
      <AuthLink>
        <ModalTrigger
          key="resend-confirmation"
          text="Didn't receive confirm instructions?"
          id={ModalIds.RESEND_CONFIRMATION_MODAL}
          wrapper={Wrapper}
        />
      </AuthLink>
    </div>
  );
}

export default AuthenticationLinks;
