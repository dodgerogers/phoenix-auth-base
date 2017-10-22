import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginModalContainer from '../../../authentication/containers/LoginModalContainer';
import RegistrationFormModalContainer from '../../../authentication/containers/RegistrationFormModalContainer';
import { hideModal } from '../actions';
import { modalIds } from '../constants';


const ModalsContainer = (props) => {
  // TODO: Really should configure this outside
  const registeredModals = [
    { component: LoginModalContainer, id: modalIds.loginModal },
    { component: RegistrationFormModalContainer, id: modalIds.registrationModal },
  ];

  function renderModals() {
    return registeredModals.map(modal => {
      const Component = modal.component;
      return (
        <Component
          show={props.modals.get(modal.id)}
          close={() => props.hideModal(modal.id)}
        />
      );
    });
  }

  return (<div className="modals">{renderModals()}</div>);
}

function mapStateToProps(state) {
  return {
    modals: state.modals,
  };
}

ModalsContainer.propTypes = {
  modals: PropTypes.object.isRequired,
};

export { ModalsContainer as PureComponent };
export default connect(mapStateToProps, { hideModal })(ModalsContainer);
