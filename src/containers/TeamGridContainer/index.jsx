import { connect } from 'react-redux';

import { TEAM_GRID_ID_PREFIX, TILES_COUNT } from '../../lib/footballField';
import withDragDropContext from '../../lib/withDragDropContext';
import { makeSelectOptions, makeSelectPlayerOptions } from '../../data/tacticDetails/selectors';
import { selectTeam } from '../../data/teams/selectors';
import { makeSelectTeamPlayers } from '../../data/players/selectors';
import { selectActivePlayerId } from '../TacticPage/selectors';
import TeamGrid from '../../components/TeamGrid';
import { movePlayer, selectPlayer, swapPlayers } from '../TacticPage/actions';

const makeMapStateToProps = () => {
  const selectOptions = makeSelectOptions();
  const selectPlayerOptions = makeSelectPlayerOptions();
  const selectTeamPlayers = makeSelectTeamPlayers();
  return (state, ownProps) => ({
    id: `${TEAM_GRID_ID_PREFIX}-${ownProps.teamId}`,
    tilesCount: TILES_COUNT,
    options: selectOptions(state),
    players: selectTeamPlayers(state, ownProps),
    team: selectTeam(state, ownProps),
    playerOptions: selectPlayerOptions(state, ownProps),
    activePlayerId: selectActivePlayerId(state),
  });
};

const mapDispatchToProps = {
  onPlayerMove: movePlayer,
  onPlayersSwap: swapPlayers,
  onPlayerSelect: selectPlayer,
};

const ConnectedTeamGridContainer = connect(makeMapStateToProps, mapDispatchToProps)(TeamGrid);

export default withDragDropContext(ConnectedTeamGridContainer);
