import React, { PropTypes } from 'react';
import { Form, Label } from 'semantic-ui-react';


const Input = (props) => {
  const hasError = props.meta && props.meta.error && props.meta.touched;

  return (
    <div className="input" style={{ margin: '0 0 1em' }}>
      <Form.Input
        error={hasError}
        {...props}
      />
      {hasError && <Label style={{ marginTop: '-1em' }} basic color="red" pointing>{props.meta.error}</Label>}
    </div>
  )
}

Input.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired
}

export default Input;
