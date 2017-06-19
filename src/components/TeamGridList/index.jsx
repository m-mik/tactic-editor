import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TeamGridContainer from '../../containers/TeamGridContainer';
import styles from './TeamGridList.scss';

class TeamGridList extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.teamIds !== nextProps.teamIds;
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.props.teamIds.map((teamId, index) => (
          <TeamGridContainer
            key={teamId}
            type={index === 0 ? 'home' : 'away'}
            teamId={teamId}
          />
        ))}
      </div>
    );
  }
}

TeamGridList.propTypes = {
  teamIds: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default TeamGridList;
