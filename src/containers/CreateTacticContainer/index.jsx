import { connect } from 'react-redux';

import CreateTactic from '../../components/CreateTactic';
import { createTactic } from '../../data/tactics/actions';
import { closeCreateTacticDialog, openCreateTacticDialog } from '../../pages/TacticPage/actions';

const mapStateToProps = state => ({
  open: state.editor.isCreateTacticDialogOpen,
  pending: state.data.tactics.status.isCreating,
});

const mapDispatchToProps = {
  onOpenDialogRequest: openCreateTacticDialog,
  onCloseDialogRequest: closeCreateTacticDialog,
  onCreate: createTactic,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTactic);
