import React from 'react';
import PropTypes from 'prop-types';

import FootballField from '../FootballField';
import TeamGridContainer from '../../containers/TeamGridContainer';

const TeamGridList = ({ teamIds }) => (
  <FootballField>
    {teamIds.map((teamId, index) => (
      <TeamGridContainer
        key={teamId}
        type={index === 0 ? 'home' : 'away'}
        teamId={teamId}
      />
    ))}
  </FootballField>
);

TeamGridList.propTypes = {
  teamIds: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default TeamGridList;
