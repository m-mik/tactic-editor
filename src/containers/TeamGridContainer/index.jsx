import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TEAM_GRID_ID_PREFIX, TILES_COUNT } from '../../lib/footballField/index';
import { selectActiveTacticId } from '../App/selectors';
import withDragDropContext from '../../lib/withDragDropContext';
import { makeSelectOptions } from '../../data/tacticDetails/selectors';
import TeamGrid from '../../components/TeamGrid';
import { movePlayer, swapPlayers, selectPlayer } from '../TacticPage/actions';

import { updateTactic } from '../../data/tactics/actions';

// class TeamGridContainer extends Component {
//   render() {
//     return (
//       <TeamGrid
//
//       />
//     );
//   }
// }

const makeMapStateToProps = () => {
  const selectOptions = makeSelectOptions();
  return (state, ownProps) => ({
    id: `${TEAM_GRID_ID_PREFIX}-${ownProps.teamId}`,
    tilesCount: TILES_COUNT,
    options: selectOptions(state),
  });
};

const mapDispatchToProps = {
  onPlayerMove: movePlayer,
  onPlayersSwap: swapPlayers,
  onPlayerSelect: selectPlayer,
};

const ConnectedTeamGridContainer = connect(makeMapStateToProps, mapDispatchToProps)(TeamGrid);

export default withDragDropContext(ConnectedTeamGridContainer);
