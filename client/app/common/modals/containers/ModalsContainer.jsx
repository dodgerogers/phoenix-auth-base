import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginModal from '../../../authentication/components/LoginModal';
import { hideModal } from '../actions/modalActions';
import { modalIds } from '../modalConstants';


const ModalsContainer = (props) => {
  // TODO: ids as constants
  const modals = [
    { component: LoginModal, id: modalIds.loginModal },
  ];

  function renderModals() {
    return modals.map(modal => {
      const Component = modal.component;
      return (
        <LoginModal
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
