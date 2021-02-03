import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, propTypes } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { validate } from '../../../shared/validation/tactic';

const Form = (props) => {
  const { onSubmit, pending, handleSubmit } = props;

  const TacticNameField = () => (
    <Field
      autoFocus
      fullWidth
      name="name"
      component={TextField}
      floatingLabelText="Tactic name"
      disabled={pending}
    />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TacticNameField />
    </form>
  );
};

Form.propTypes = {
  pending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  ...propTypes,
};

export default reduxForm({
  form: 'createTacticForm',
  validate,
})(Form);
