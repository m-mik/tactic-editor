import React from 'react';
import PropTypes from 'prop-types';
import FootballGround from './FootballGround';
import Loading from '../../components/Loading';

const TacticEditor = (props) => {
  const { tactic, loading } = props;
  const { teams } = tactic;

  const renderLoading = () => (
    loading && <Loading size={150} className="tactic-editor__loading" />
  );

  return (
    <div className="tactic-editor">
      {renderLoading()}
      <FootballGround />
      {teams.map(team => <div key={team.id}>{team.name}</div>)}
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
