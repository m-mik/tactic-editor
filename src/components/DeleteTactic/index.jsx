import React from 'react';
import PropTypes from 'prop-types';

import DeleteTacticDialog from '../DeleteTacticDialog';
import DeleteTacticButton from '../DeleteTacticButton';

const DeleteTactic = props => (
  <div>
    <DeleteTacticButton onTouchTap={props.onOpenDialog} />
    <DeleteTacticDialog
      pending={props.pending}
      tactic={props.tactic}
      onClose={props.onCloseDialog}
      onDelete={props.onDelete}
      open={props.open}
    />
  </div>
);

DeleteTactic.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenDialog: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  tactic: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeleteTactic;
