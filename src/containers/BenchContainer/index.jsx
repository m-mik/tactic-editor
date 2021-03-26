import { connect } from 'react-redux';

import Bench from '../../components/Bench';
import { makeSelectTeamPlayers } from '../../data/players/selectors';

const makeMapStateToProps = () => {
  const selectTeamBenchPlayers = makeSelectTeamPlayers({ filter: 'bench', convertToObject: false });
  return (state, ownProps) => ({
    players: selectTeamBenchPlayers(state, ownProps),
  });
};

const mapDispatchToProps = {};

export default connect(makeMapStateToProps, mapDispatchToProps)(Bench);
