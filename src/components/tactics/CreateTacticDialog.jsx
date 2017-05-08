import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, propTypes } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';
import Loading from '../../components/Loading';

const CreateTacticDialog = (props) => {
  const { onSubmit, onClose, open, createTacticPending, handleSubmit } = props;

  const handleCreateTacticSubmit = handleSubmit(onSubmit);

  const actions = [
    <FlatButton
      label="Cancel"
      primary
      disabled={createTacticPending}
      onTouchTap={onClose}
    />,
    <FlatButton
      label="Create"
      primary
      type="submit"
      disabled={createTacticPending}
      onTouchTap={handleCreateTacticSubmit}
    />,
  ];

  const TacticNameField = () => (
    <Field
      autoFocus
      fullWidth
      name="name"
      component={TextField}
      floatingLabelText="Tactic name"
      disabled={createTacticPending}
    />
  );

  return (
    <Dialog
      bodyClassName="create-tactic-dialog__body"
      title="Create Tactic"
      actions={actions}
      modal={false}
      open={open}
      onRequestClose={onClose}
    >
      <form onSubmit={handleCreateTacticSubmit}>
        {createTacticPending && <Loading className="create-tactic-dialog__loading" />}
        <TacticNameField />
      </form>
    </Dialog>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Tactic name cannot be empty';
  }
  return errors;
};

CreateTacticDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ...propTypes,
};

export default reduxForm({
  form: 'createTacticForm',
  validate,
})(CreateTacticDialog);
