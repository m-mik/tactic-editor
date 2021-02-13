import { connect } from 'react-redux';

import DeleteTactic from '../../components/DeleteTactic';
import { openDeleteTacticDialog, closeDeleteTacticDialog } from '../App/actions';
import { makeSelectTactic, selectIsDeleting } from '../../data/tactics/selectors';
import { selectIsDeleteTacticDialogOpen } from '../App/selectors';
import { deleteTactic } from '../../data/tactics/actions';

const makeMapStateToProps = () => {
  const selectTactic = makeSelectTactic();
  return state => ({
    open: selectIsDeleteTacticDialogOpen(state),
    pending: selectIsDeleting(state),
    tactic: selectTactic(state),
  });
};

const mapDispatchToProps = {
  onCloseDialog: closeDeleteTacticDialog,
  onOpenDialog: openDeleteTacticDialog,
  onDelete: deleteTactic,
};

export default connect(makeMapStateToProps, mapDispatchToProps)(DeleteTactic);
