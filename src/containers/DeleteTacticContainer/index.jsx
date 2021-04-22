import { connect } from 'react-redux';

import DeleteTactic from '../../components/DeleteTactic';
import { makeSelectTactic, selectIsDeleting } from '../../data/tactics/selectors';
import { deleteTactic } from '../../data/tactics/actions';
import { closeDeleteTacticDialog, openDeleteTacticDialog } from '../../pages/TacticPage/actions';
import { selectIsDeleteTacticDialogOpen } from '../../pages/TacticPage/selectors';

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
