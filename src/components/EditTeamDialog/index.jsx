import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Form from './Form';
import styles from './EditTeamDialog.scss';

const EditTeamDialog = (props) => {
  const { onSubmit, onClose, team } = props;

  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onTouchTap={onClose}
    />,
    <FlatButton
      label="Edit"
      primary
      type="submit"
      onTouchTap={() => { this.form.submit(); }}
    />,
  ];

  return (
    <Dialog
      bodyClassName={styles.body}
      title="Edit Team"
      actions={actions}
      onRequestClose={onClose}
      modal
      open
    >
      <Form
        ref={(form) => { this.form = form; }}
        open={open}
        onSubmit={onSubmit}
        initialValues={team}
      />
    </Dialog>
  );
};

EditTeamDialog.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    shirt: PropTypes.object,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditTeamDialog;
