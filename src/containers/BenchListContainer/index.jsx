import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

import styles from './BenchListContainer.scss';
import BenchContainer from '../BenchContainer';
import { makeSelectTacticDetail } from '../../data/tacticDetails/selectors';
import pt from '../../propTypes';

// eslint-disable-next-line react/prefer-stateless-function
class BenchListContainer extends Component {
  render() {
    const { tacticDetail } = this.props;
    const teamIds = get(tacticDetail, 'teams') || [-1, -1];

    return (
      <div className={styles.wrapper}>
        <BenchContainer teamId={teamIds[0]} />
        <BenchContainer teamId={teamIds[1]} />
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
