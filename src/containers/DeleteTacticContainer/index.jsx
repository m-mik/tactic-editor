import { connect } from 'react-redux';

import DeleteTactic from '../../components/DeleteTactic';
import { openDeleteTacticDialog, closeDeleteTacticDialog } from '../App/actions';
import { tacticDetailSelector } from '../../data/tacticDetails/selectors';
import { deleteTactic } from '../../data/tactics/actions';

const mapStateToProps = state => ({
  open: state.app.isDeleteTacticDialogOpen,
  pending: state.data.tactics.status.isDeleting,
  tactic: tacticDetailSelector(state),
});

const mapDispatchToProps = {
  onCloseDialog: closeDeleteTacticDialog,
  onOpenDialog: openDeleteTacticDialog,
  onDelete: deleteTactic,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTactic);
