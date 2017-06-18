import { connect } from 'react-redux';

import TeamInfo from '../../components/TeamInfo';
import { updateTeam } from '../../data/teams/actions';
import { openEditTeamDialog, updateFormation } from '../TacticPage/actions';
import { makeSelectTeamInfo } from './selectors';

const makeMapStateToProps = () => {
  const selectTeamInfo = makeSelectTeamInfo();
  return (state, ownProps) => ({
    team: selectTeamInfo(state, ownProps),
  });
};

const mapDispatchToprops = {
  onUpdate: updateTeam,
  onEditTeamTouchTap: openEditTeamDialog,
  onFormationChange: updateFormation,
};

export default connect(makeMapStateToProps, mapDispatchToprops)(TeamInfo);
