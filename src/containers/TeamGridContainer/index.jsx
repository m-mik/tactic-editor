import { connect } from 'react-redux';

import { TEAM_GRID_ID_PREFIX, TILES_COUNT } from '../../lib/footballField/index';
import withDragDropContext from '../../lib/withDragDropContext';
import { makeSelectOptions } from '../../data/tacticDetails/selectors';
import TeamGrid from '../../components/TeamGrid';

const makeMapStateToProps = () => {
  const selectOptions = makeSelectOptions();
  return (state, ownProps) => ({
    id: `${TEAM_GRID_ID_PREFIX}-${ownProps.teamId}`,
    tilesCount: TILES_COUNT,
    options: selectOptions(state),
  });
};

const ConnectedTeamGridContainer = connect(makeMapStateToProps)(TeamGrid);

export default withDragDropContext(ConnectedTeamGridContainer);
