import React from 'react';
import PropTypes from 'prop-types';
import Overlay from './Overlay';
import Grid from './Grid';
import styles from './FootballField.scss';

const FootballField = ({ teams }) => {
  if (!teams) return <div>No teams</div>;

  const tilesCount = 36;

  const renderGrids = () => teams.map((team, index) =>
    <Grid
      key={team.id}
      tilesCount={tilesCount}
      home={index === 0}
      away={index === 1}
      team={team}
    />,
  );

  return (
    <div className={styles.wrapper}>
      {renderGrids()}
      <Overlay />
    </div>
  );
};

FootballField.defaultProps = {
  teams: [],
};

FootballField.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object),
};

export default FootballField;
