import { connect } from 'react-redux';

import Bench from '../../components/Bench';
import withDragDropContext from '../../lib/withDragDropContext';
import { makeSelectTeamPlayers } from '../../data/players/selectors';
import { makeSelectTeamInfo } from '../TeamInfoContainer/selectors';
import { makeSelectPlayerOptions } from '../../data/tacticDetails/selectors';
import { movePlayer, selectPlayer, swapPlayers } from '../TacticPage/actions';
import { selectTeam } from '../../data/teams/selectors';

const makeMapStateToProps = () => {
  const selectTeamBenchPlayers = makeSelectTeamPlayers({ filter: 'bench' });
  const selectTeamInfo = makeSelectTeamInfo();
  const selectPlayerOptions = makeSelectPlayerOptions();

  return (state, ownProps) => ({
    players: selectTeamBenchPlayers(state, ownProps),
    teamInfo: selectTeamInfo(state, ownProps),
    team: selectTeam(state, ownProps),
    playerOptions: selectPlayerOptions(state, ownProps),
  });
};

const mapDispatchToProps = {
  onPlayerMove: movePlayer,
  onPlayersSwap: swapPlayers,
  onPlayerSelect: selectPlayer,
};

const ConnectedBench = connect(makeMapStateToProps, mapDispatchToProps)(Bench);
export default withDragDropContext(ConnectedBench);
