import React from 'react';
import PropTypes from 'prop-types';

import TeamGridContainer from '../../containers/TeamGridContainer';
import styles from './TeamGridList.scss';

const TeamGridList = ({ teamIds }) => (
  <div className={styles.wrapper}>
    {teamIds.map((teamId, index) => (
      <TeamGridContainer
        key={teamId}
        type={index === 0 ? 'home' : 'away'}
        teamId={teamId}
      />
    ))}
  </div>
);

TeamGridList.propTypes = {
  teamIds: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default TeamGridList;
