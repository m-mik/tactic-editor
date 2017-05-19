import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as tacticActions from '../../entities/tactics/actions';
import * as sidebarActions from './actions';
import * as appActions from '../App/actions';
import { tacticsSelector } from '../../entities/tactics/selectors';
import CreateTacticButton from '../../components/CreateTacticButton/index';
import CreateTacticDialog from '../../components/CreateTacticDialog/index';
import TacticList from '../../components/TacticList/index';
import style from './Sidebar.scss';

class Sidebar extends Component {
  componentDidMount() {
    const { fetchTactics, selectTactic, match } = this.props;
    fetchTactics();
    selectTactic(+match.params.id);
  }

  render() {
    const {
      isFetchingTactics,
      isCreateTacticDialogOpen,
      isCreatingTactic,
      tactics,
      selectedTacticId,
      openCreateTacticDialog,
      closeCreateTacticDialog,
      createTactic,
      selectTactic,
    } = this.props;

    return (
      <div className={style.wrapper}>
        <CreateTacticButton onTouchTap={openCreateTacticDialog} />
        <TacticList
          tactics={tactics}
          fetching={isFetchingTactics}
          selectedTacticId={selectedTacticId}
          onSelectTactic={(event, id) => selectTactic(id, history)}
        />
        <CreateTacticDialog
          onClose={closeCreateTacticDialog}
          onSubmit={createTactic}
          open={isCreateTacticDialogOpen}
          pending={isCreatingTactic}
        />
      </div>
    );
  }
}

Sidebar.propTypes = {
  fetchTactics: PropTypes.func.isRequired,
  createTactic: PropTypes.func.isRequired,
  openCreateTacticDialog: PropTypes.func.isRequired,
  closeCreateTacticDialog: PropTypes.func.isRequired,
  selectTactic: PropTypes.func.isRequired,
  selectedTacticId: PropTypes.number.isRequired,
  tactics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isFetchingTactics: PropTypes.bool.isRequired,
  isCreatingTactic: PropTypes.bool.isRequired,
  isCreateTacticDialogOpen: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = (state) => {
  const { entities, sidebar, app } = state;
  const { tactics } = entities;
  const { isCreating, isFetching } = tactics.status;
  const { selectedTacticId } = app;
  const { isCreateTacticDialogOpen } = sidebar;

  return {
    tactics: tacticsSelector(state),
    isFetchingTactics: isFetching,
    isCreatingTactic: isCreating,
    isCreateTacticDialogOpen,
    selectedTacticId,
  };
};

const ConnectedSidebar = connect(
  mapStateToProps,
  { ...tacticActions, ...sidebarActions, ...appActions },
)(Sidebar);

export default withRouter(ConnectedSidebar);
