import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, propTypes } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { validate } from '../../../shared/validation/tactic';

// eslint-disable-next-line react/prefer-stateless-function
class Form extends Component {
  render() {
    const { onSubmit, pending, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          autoFocus
          fullWidth
          name="name"
          component={TextField}
          floatingLabelText="Tactic name"
          disabled={pending}
        />
      </form>
    );
  }
}

Form.propTypes = {
  pending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  ...propTypes,
};

export default reduxForm({
  form: 'createTacticForm',
  validate,
})(Form);
