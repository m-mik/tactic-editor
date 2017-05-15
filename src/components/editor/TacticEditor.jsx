import React from 'react';
import PropTypes from 'prop-types';
import FootballField from './FootballField';
import Loading from '../Loading';
import TeamDetail from './TeamDetail';

const TacticEditor = (props) => {
  // if (!props.tactic) return <FootballField />;

  const { tactic, loading } = props;
  const teams = tactic && tactic.teams;

  const renderLoading = () => (
    loading && <Loading size={150} className="tactic-editor__loading" />
  );

  const renderTeamDetails = () => (
    teams.map(team => <TeamDetail key={team.id} team={team} />)
  );


  return (
    <div className="tactic-editor">
      {/* {renderLoading()}*/}
      <FootballField />
      {/* <div>*/}
      {/* {renderTeamDetails()}*/}
      {/* </div>*/}
    </div>
  );
};

TacticEditor.defaultProps = {
  loading: false,
  tactic: null,
};

TacticEditor.propTypes = {
  loading: PropTypes.bool,
  tactic: PropTypes.shape({
    teams: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      players: PropTypes.object.isRequired,
    })),
  }),
};
export default TacticEditor;
