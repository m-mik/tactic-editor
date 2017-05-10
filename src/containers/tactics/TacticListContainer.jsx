import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as tacticActions from '../../actions/tactics';
import { tacticsSelector } from '../../selectors/tactics';
import CreateTacticButton from '../../components/tactics/CreateTacticButton';
import CreateTacticDialog from '../../components/tactics/CreateTacticDialog';
import TacticList from '../../components/tactics/TacticList';

const TacticListContainer = (props) => {
  const {
      isFetchingTactics,
      isCreateTacticDialogOpen,
      isCreateTacticPending,
      tactics,
      selectedTacticId,
      openCreateTacticDialog,
      closeCreateTacticDialog,
      createAndSelectTactic,
      fetchTactics,
    } = props;

  return (
    <div>
      <CreateTacticButton onTouchTap={openCreateTacticDialog} />
      <TacticList
        tactics={tactics}
        fetching={isFetchingTactics}
        selectedTacticId={selectedTacticId}
        onFetchTacticsRequest={fetchTactics}
      />
      <CreateTacticDialog
        onClose={closeCreateTacticDialog}
        onSubmit={createAndSelectTactic}
        open={isCreateTacticDialogOpen}
        pending={isCreateTacticPending}
      />
    </div>
  );
};

TacticListContainer.propTypes = {
  fetchTactics: PropTypes.func.isRequired,
  createAndSelectTactic: PropTypes.func.isRequired,
  openCreateTacticDialog: PropTypes.func.isRequired,
  closeCreateTacticDialog: PropTypes.func.isRequired,
  selectedTacticId: PropTypes.number.isRequired,
  tactics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isFetchingTactics: PropTypes.bool.isRequired,
  isCreateTacticPending: PropTypes.bool.isRequired,
  isCreateTacticDialogOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { entities: { tactics }, ui } = state;
  const { selectedTacticId, isCreateTacticDialogOpen, isCreateTacticPending } = ui;
  return {
    tactics: tacticsSelector(state),
    isFetchingTactics: tactics.status.isFetching,
    isCreateTacticDialogOpen,
    isCreateTacticPending,
    selectedTacticId,
  };
};

export default connect(mapStateToProps, tacticActions)(TacticListContainer);
