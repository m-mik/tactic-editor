import React from 'react';
import PropTypes from 'prop-types';

import CreateTacticDialog from '../CreateTacticDialog';
import CreateTacticButton from '../CreateTacticButton';

const CreateTactic = props => (
  <div>
    <CreateTacticButton onTouchTap={props.onOpenDialogRequest} />
    <CreateTacticDialog
      onClose={props.onCloseDialogRequest}
      onCreate={props.onCreate}
      open={props.open}
      pending={props.pending}
    />
  </div>
);

CreateTactic.propTypes = {
  onOpenDialogRequest: PropTypes.func.isRequired,
  onCloseDialogRequest: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
};

export default CreateTactic;
