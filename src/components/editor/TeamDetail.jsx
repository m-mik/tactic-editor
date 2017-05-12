import React from 'react';
import PropTypes from 'prop-types';

const TeamDetail = ({ team }) => (
  <div>
    <h1>{team.name}</h1>
    <ul>
      {team.players.map(player => <li key={player.id}>{player.name}</li>)}
    </ul>
  </div>
);

export default TeamDetail;

TeamDetail.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
