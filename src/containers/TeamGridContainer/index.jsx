import { connect } from 'react-redux';
import pick from 'lodash/pick';

import { TEAM_GRID_ID_PREFIX, TILES_COUNT } from '../../lib/footballField';
import withDragDropContext from '../../lib/withDragDropContext';
import { makeSelectOptions } from '../../data/tacticDetails/selectors';
import { selectTeam } from '../../data/teams/selectors';
import { makeSelectTeamPlayers } from '../../data/players/selectors';
import TeamGrid from '../../components/TeamGrid';

const makeMapStateToProps = () => {
  const selectOptions = makeSelectOptions();
  const selectTeamPlayers = makeSelectTeamPlayers({ filter: 'field' });
  // noinspection JSCheckFunctionSignatures
  return (state, ownProps) => ({
    id: `${TEAM_GRID_ID_PREFIX}-${ownProps.teamId}`,
    tilesCount: TILES_COUNT,
    options: pick(selectOptions(state), 'showGrid'),
    players: selectTeamPlayers(state, ownProps),
    team: selectTeam(state, ownProps),
  });
};

const mapDispatchToProps = {};

const ConnectedTeamGridContainer = connect(makeMapStateToProps, mapDispatchToProps)(TeamGrid);

export default withDragDropContext(ConnectedTeamGridContainer);
