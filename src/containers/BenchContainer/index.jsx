import { connect } from 'react-redux';

import Bench from '../../components/Bench';
import withDragDropContext from '../../lib/withDragDropContext';
import { makeSelectTeamPlayers } from '../../data/players/selectors';

import { addBenchPlayer } from '../../data/teams/actions';
import { selectTeam } from '../../data/teams/selectors';

const makeMapStateToProps = () => {
  const selectTeamBenchPlayers = makeSelectTeamPlayers({ filter: 'bench' });

  // noinspection JSCheckFunctionSignatures
  return (state, ownProps) => ({
    players: selectTeamBenchPlayers(state, ownProps),
    team: selectTeam(state, ownProps),
  });
};

const mapDispatchToProps = {
  onBenchPlayerAdd: addBenchPlayer,
};

const ConnectedBench = connect(makeMapStateToProps, mapDispatchToProps)(Bench);
export default withDragDropContext(ConnectedBench);
