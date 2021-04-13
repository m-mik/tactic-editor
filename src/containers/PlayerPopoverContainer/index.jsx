import React from 'react';
import { connect } from 'react-redux';

import PlayerPopover from '../../components/PlayerPopover';
import { updatePlayer } from '../../data/players/actions';
import { addTeamStat, removeTeamStat, updateTeam } from '../../data/teams/actions';
import { makeSelectPlayerStats } from '../../data/players/selectors';

const makeMapStateToProps = () => {
  const selectPlayerStats = makeSelectPlayerStats();
  return (state, ownProps) => ({
    playerStats: selectPlayerStats(state, ownProps),
  });
};

const mapDispatchToProps = {
  onPlayerChange: updatePlayer,
  onTeamStatChange: updateTeam,
  onTeamStatAdd: addTeamStat,
  onTeamStatRemove: removeTeamStat,
};

export default connect(makeMapStateToProps, mapDispatchToProps)(PlayerPopover);
