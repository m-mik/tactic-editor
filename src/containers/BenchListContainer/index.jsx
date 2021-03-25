import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { makeSelectTacticDetail } from '../../data/tacticDetails/selectors';
import styles from './BenchListContainer.scss';

class BenchPlayersContainer extends PureComponent {
  render() {
    return (
      <div className={styles.wrapper}>BenchPlayersContainer</div>
    );
  }
}

const mapStateToProps = (state) => {
  const selectTacticDetail = makeSelectTacticDetail();
  return {
    tacticDetail: selectTacticDetail(state),
  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BenchPlayersContainer);
