import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Form, Label } from 'semantic-ui-react';


const Input = (props) => {
  const hasError = props.meta && props.meta.error && props.meta.touched;
  const { meta, ...inputProps } = props;

  return (
    <div className="input" style={{ margin: '0 0 1em' }}>
      <Form.Input
        error={hasError}
        {...inputProps}
      />
      {hasError && <Label style={{ marginTop: '0em' }} basic color="red" pointing>{props.meta.error}</Label>}
    </div>
  )
}

Input.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      ImmutablePropTypes.list
    ]),
  }).isRequired
}

export default Input;
