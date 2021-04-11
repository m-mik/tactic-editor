import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './BenchListContainer.scss';
import BenchContainer from '../BenchContainer';
import { makeSelectTacticDetail } from '../../data/tacticDetails/selectors';
import pt from '../../propTypes';

class BenchListContainer extends Component {
  render() {
    const { tacticDetail } = this.props;
    const teams = (tacticDetail && tacticDetail.teams) || [];

    return (
      <div className={styles.wrapper}>
        {teams.map(teamId => <BenchContainer key={teamId} teamId={teamId} />)}
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  const selectTacticDetail = makeSelectTacticDetail();

  return state => ({
    tacticDetail: selectTacticDetail(state),
  });
};

const mapDispatchToProps = {};

BenchListContainer.defaultProps = {
  tacticDetail: null,
};

BenchListContainer.propTypes = {
  tacticDetail: pt.tacticDetail,
};

export default connect(makeMapStateToProps, mapDispatchToProps)(BenchListContainer);
