import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as tacticActions from '../../actions/tactics';
import { tacticsSelector } from '../../selectors/tactics';
import CreateTacticButton from '../../components/tactics/CreateTacticButton';
import CreateTacticDialog from '../../components/tactics/CreateTacticDialog';
import TacticList from '../../components/tactics/TacticList';

class TacticListContainer extends Component {
  componentDidMount() {
    const { fetchTactics, selectTactic, match } = this.props;
    fetchTactics();
    selectTactic(+match.params.id);
  }

  render() {
    const {
      isFetchingTactics,
      isCreateTacticDialogOpen,
      isCreateTacticPending,
      tactics,
      selectedTacticId,
      openCreateTacticDialog,
      closeCreateTacticDialog,
      createAndSelectTactic,
      selectTactic,
    } = this.props;

    return (
      <div>
        <CreateTacticButton onTouchTap={openCreateTacticDialog} />
        <TacticList
          tactics={tactics}
          fetching={isFetchingTactics}
          selectedTacticId={selectedTacticId}
          onSelectTactic={(event, id) => selectTactic(id)}
        />
        <CreateTacticDialog
          onClose={closeCreateTacticDialog}
          onSubmit={createAndSelectTactic}
          open={isCreateTacticDialogOpen}
          pending={isCreateTacticPending}
        />
      </div>
    );
  }
}

TacticListContainer.propTypes = {
  fetchTactics: PropTypes.func.isRequired,
  createAndSelectTactic: PropTypes.func.isRequired,
  openCreateTacticDialog: PropTypes.func.isRequired,
  closeCreateTacticDialog: PropTypes.func.isRequired,
  selectTactic: PropTypes.func.isRequired,
  selectedTacticId: PropTypes.number.isRequired,
  tactics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isFetchingTactics: PropTypes.bool.isRequired,
  isCreateTacticPending: PropTypes.bool.isRequired,
  isCreateTacticDialogOpen: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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

const ConnectedTacticListContainer = connect(
  mapStateToProps,
  tacticActions)(TacticListContainer,
);

export default withRouter(ConnectedTacticListContainer);
