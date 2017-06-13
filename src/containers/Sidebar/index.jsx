import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import isEqual from 'lodash/isEqual';
import * as tacticActions from '../../entities/tactics/actions';
import * as tacticDetailActions from '../../entities/tacticDetails/actions';
import * as sidebarActions from './actions';
import * as appActions from '../App/actions';
import { tacticsSelector } from '../../entities/tactics/selectors';
import CreateTacticButton from '../../components/CreateTacticButton';
import CreateTacticDialog from '../../components/CreateTacticDialog';
import DeleteTacticDialog from '../../components/DeleteTacticDialog';
import TacticList from '../../components/TacticList/index';
import TacticSettings from '../../components/TacticSettings';
import { tacticDetailSelector } from '../../entities/tacticDetails/selectors';
import style from './Sidebar.scss';

class Sidebar extends Component {
  componentDidMount() {
    const { fetchTactics, selectTactic, match } = this.props;
    fetchTactics();
    selectTactic(+match.params.id);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.selectedTacticId !== nextProps.selectedTacticId
      || this.props.tactics.length !== nextProps.tactics.length
      || this.props.isCreateTacticDialogOpen !== nextProps.isCreateTacticDialogOpen
      || this.props.isDeleteTacticDialogOpen !== nextProps.isDeleteTacticDialogOpen
      || (this.props.tactic === null && nextProps.tactic !== null)
      || !isEqual(this.props.tactic.name, nextProps.tactic.name)
      || !isEqual(this.props.tactic.options, nextProps.tactic.options);
  }

  render() {
    const {
      isFetchingTactics,
      isCreatingTactic,
      isDeletingTactic,
      isCreateTacticDialogOpen,
      isDeleteTacticDialogOpen,
      tactics,
      selectedTacticId,
      openCreateTacticDialog,
      closeCreateTacticDialog,
      openDeleteTacticDialog,
      closeDeleteTacticDialog,
      createTactic,
      selectTactic,
      updateTactic,
      deleteTactic,
      tactic,
    } = this.props;

    const paperDepth = 3;

    return (
      <div className={style.wrapper}>
        {tactic && <Paper zDepth={paperDepth}>
          <TacticSettings
            tactic={tactic}
            onDeleteTacticTouchTap={openDeleteTacticDialog}
            onSettingChange={updateTactic}
          />
          <DeleteTacticDialog
            tactic={tactic}
            open={isDeleteTacticDialogOpen}
            pending={isDeletingTactic}
            onClose={closeDeleteTacticDialog}
            onDelete={deleteTactic}
          />
        </Paper>}
        <Paper zDepth={paperDepth}>
          <CreateTacticButton onTouchTap={openCreateTacticDialog} />
          <TacticList
            tactics={tactics}
            fetching={isFetchingTactics}
            selectedTacticId={selectedTacticId}
            onSelectTactic={(event, id) => selectTactic(id)}
          />
          <CreateTacticDialog
            onClose={closeCreateTacticDialog}
            onCreate={createTactic}
            open={isCreateTacticDialogOpen}
            pending={isCreatingTactic}
          />
        </Paper>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  tactic: null,
};

Sidebar.propTypes = {
  fetchTactics: PropTypes.func.isRequired,
  createTactic: PropTypes.func.isRequired,
  updateTactic: PropTypes.func.isRequired,
  deleteTactic: PropTypes.func.isRequired,
  openCreateTacticDialog: PropTypes.func.isRequired,
  openDeleteTacticDialog: PropTypes.func.isRequired,
  closeCreateTacticDialog: PropTypes.func.isRequired,
  closeDeleteTacticDialog: PropTypes.func.isRequired,
  selectTactic: PropTypes.func.isRequired,
  selectedTacticId: PropTypes.number.isRequired,
  tactics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  tactic: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    teams: PropTypes.arrayOf(PropTypes.object).isRequired,
    options: PropTypes.object.isRequired,
  }),
  isFetchingTactics: PropTypes.bool.isRequired,
  isCreatingTactic: PropTypes.bool.isRequired,
  isDeletingTactic: PropTypes.bool.isRequired,
  isCreateTacticDialogOpen: PropTypes.bool.isRequired,
  isDeleteTacticDialogOpen: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = (state) => {
  const { entities, sidebar, app } = state;
  const { tactics } = entities;
  const { isCreating, isFetching, isDeleting } = tactics.status;
  const { selectedTacticId } = app;
  const { isCreateTacticDialogOpen, isDeleteTacticDialogOpen } = sidebar;

  return {
    tactic: tacticDetailSelector(state),
    tactics: tacticsSelector(state),
    isFetchingTactics: isFetching,
    isCreatingTactic: isCreating,
    isDeletingTactic: isDeleting,
    isCreateTacticDialogOpen,
    isDeleteTacticDialogOpen,
    selectedTacticId,
  };
};

const ConnectedSidebar = connect(
  mapStateToProps,
  { ...tacticDetailActions, ...tacticActions, ...sidebarActions, ...appActions },
)(Sidebar);

export default withRouter(ConnectedSidebar);
