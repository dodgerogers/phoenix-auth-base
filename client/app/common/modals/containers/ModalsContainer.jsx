import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignInModal from '../../../authentication/components/SignInModal';
import RegistrationFormModal from '../../../authentication/components/RegistrationFormModal';
import ConfirmationModal from '../../../authentication/components/ConfirmationModal';
import ResendConfirmationModal from '../../../authentication/components/ResendConfirmationModal';
import ForgotPasswordModal from '../../../authentication/components/ForgotPasswordModal';
import ResetPasswordModal from '../../../authentication/components/ResetPasswordModal';
import { hideModal } from '../actions';
import { modalIds } from '../constants';


const ModalsContainer = (props) => {
  const registeredModals = [
    { component: SignInModal, id: modalIds.SIGN_IN_MODAL },
    { component: RegistrationFormModal, id: modalIds.REGISTRATION_MODAL },
    { component: ConfirmationModal, id: modalIds.CONFIRMATION_MODAL },
    { component: ResendConfirmationModal, id: modalIds.RESEND_CONFIRMATION_MODAL },
    { component: ForgotPasswordModal, id: modalIds.FORGOT_PASSWORD_MODAL },
    { component: ResetPasswordModal, id: modalIds.RESET_PASSWORD_MODAL },
  ];

  function renderModals() {
    return registeredModals.map(modal => {
      const Component = modal.component;
      return (
        <Component
          key={modal.id}
          show={props.modals.get(modal.id)}
          close={() => props.hideModal(modal.id)}
        />
      );
    });
  }

  return (<div className="modals">{renderModals()}</div>);
}

function mapStateToProps({ modals }) {
  return { modals };
}

ModalsContainer.propTypes = {
  modals: PropTypes.object.isRequired,
};

export { ModalsContainer as PureComponent };
export default connect(mapStateToProps, { hideModal })(ModalsContainer);
