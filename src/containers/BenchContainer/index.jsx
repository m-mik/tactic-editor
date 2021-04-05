import { connect } from 'react-redux';

import Bench from '../../components/Bench';
import withDragDropContext from '../../lib/withDragDropContext';
import { makeSelectTeamPlayers } from '../../data/players/selectors';
import { makeSelectTeamInfo } from '../TeamInfoContainer/selectors';
import { selectTeam } from '../../data/teams/selectors';

const makeMapStateToProps = () => {
  const selectTeamBenchPlayers = makeSelectTeamPlayers({ filter: 'bench' });
  const selectTeamInfo = makeSelectTeamInfo();

  return (state, ownProps) => ({
    players: selectTeamBenchPlayers(state, ownProps),
    teamInfo: selectTeamInfo(state, ownProps),
    team: selectTeam(state, ownProps),
  });
};

const mapDispatchToProps = {};

const ConnectedBench = connect(makeMapStateToProps, mapDispatchToProps)(Bench);
export default withDragDropContext(ConnectedBench);
