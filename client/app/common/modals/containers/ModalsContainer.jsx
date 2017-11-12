import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginModal from '../../../authentication/components/LoginModal';
import RegistrationFormModal from '../../../authentication/components/RegistrationFormModal';
import { hideModal } from '../actions';
import { modalIds } from '../constants';


const ModalsContainer = (props) => {
  const registeredModals = [
    { component: LoginModal, id: modalIds.loginModal },
    { component: RegistrationFormModal, id: modalIds.registrationModal },
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
