import React from 'react';
import PropTypes from 'prop-types';
import FootballField from './FootballField';
import Loading from '../Loading';
import TeamDetail from './TeamDetail';

const TacticEditor = (props) => {
  const { tactic, loading } = props;
  const { teams } = tactic;

  const renderLoading = () => (
    loading && <Loading size={150} className="tactic-editor__loading" />
  );

  const renderTeamDetails = () => (
    teams.map(team => <TeamDetail key={team.id} team={team} />)
  );

  return (
    <div className="tactic-editor">
      {/*{renderLoading()}*/}
      <FootballField />
      {/*<div>*/}
        {/*{renderTeamDetails()}*/}
      {/*</div>*/}
    </div>
  );
};

TacticEditor.defaultProps = {
  loading: false,
};

TacticEditor.propTypes = {
  loading: PropTypes.bool,
  tactic: PropTypes.shape({
    teams: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      players: PropTypes.arrayOf(PropTypes.object),
    })),
  }).isRequired,
};
export default TacticEditor;
