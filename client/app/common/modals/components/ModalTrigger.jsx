import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { showModal } from '../actions';
import { modalIds } from '../constants';


const ModalTrigger = (props) => {
  const Wrapper = props.wrapper || Button;

  return (
    <Wrapper onClick={props.showModal(props.id)}>
      {props.text}
    </Wrapper>
  )
}

ModalTrigger.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};

ModalTrigger.defaultProps = {
  text: 'Open Modal',
}

export { ModalTrigger as PureComponent };
export default connect(null, { showModal })(ModalTrigger);
