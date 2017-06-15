import { connect } from 'react-redux';

import CreateTactic from '../../components/CreateTactic';
import { openCreateTacticDialog, closeCreateTacticDialog } from '../App/actions';
import { createTactic } from '../../data/tactics/actions';

const mapStateToProps = state => ({
  open: state.app.isCreateTacticDialogOpen,
  pending: state.data.tactics.status.isCreating,
});

const mapDispatchToProps = {
  onOpenDialogRequest: openCreateTacticDialog,
  onCloseDialogRequest: closeCreateTacticDialog,
  onCreate: createTactic,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTactic);
