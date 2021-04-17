import { connect } from 'react-redux';

import Bench from '../../components/Bench';
import withDragDropContext from '../../lib/withDragDropContext';
import { makeSelectTeamPlayers } from '../../data/players/selectors';
import { selectDenormalizedSubstitutions, selectTeam } from '../../data/teams/selectors';
import { addBenchPlayer, removeSubstitution } from '../../data/teams/actions';

const makeMapStateToProps = () => {
  const selectTeamBenchPlayers = makeSelectTeamPlayers({ filter: 'bench' });

  return (state, ownProps) => ({
    players: selectTeamBenchPlayers(state, ownProps),
    // denormalizedSubstitutions: selectDenormalizedSubstitutions(state, ownProps),
    team: selectTeam(state, ownProps),
  });
};

const mapDispatchToProps = {
  onSubstitutionRemove: removeSubstitution,
  onBenchPlayerAdd: addBenchPlayer,
};

const ConnectedBench = connect(makeMapStateToProps, mapDispatchToProps)(Bench);
export default withDragDropContext(ConnectedBench);
