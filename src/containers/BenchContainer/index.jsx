import { connect } from 'react-redux';

import Bench from '../../components/Bench';
import { makeSelectTeamPlayers } from '../../data/players/selectors';
import { makeSelectTeamInfo } from '../TeamInfoContainer/selectors';
import { makeSelectPlayerOptions } from '../../data/tacticDetails/selectors';
import { selectPlayer } from '../TacticPage/actions';
import { selectActivePlayerId } from '../TacticPage/selectors';

const makeMapStateToProps = () => {
  const selectTeamBenchPlayers = makeSelectTeamPlayers({ filter: 'bench', convertToObject: false });
  const selectTeamInfo = makeSelectTeamInfo();
  const selectPlayerOptions = makeSelectPlayerOptions();

  return (state, ownProps) => ({
    players: selectTeamBenchPlayers(state, ownProps),
    team: selectTeamInfo(state, ownProps),
    playerOptions: selectPlayerOptions(state, ownProps),
    activePlayerId: selectActivePlayerId(state),
  });
};

const mapDispatchToProps = {
  onPlayerSelect: selectPlayer,
};

export default connect(makeMapStateToProps, mapDispatchToProps)(Bench);
