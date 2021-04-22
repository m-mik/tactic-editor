import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

import TacticList from '../../components/TacticList';
import { selectTacticsArray, selectIsFetching } from '../../data/tactics/selectors';
import { fetchTactics } from '../../data/tactics/actions';
import { selectActiveTacticId } from '../../pages/TacticPage/selectors';
import { selectTactic } from '../../pages/TacticPage/actions';
import pt from '../../propTypes';

class TacticListContainer extends PureComponent {
  componentDidMount() {
    this.props.fetchTactics();
    this.props.selectTactic(+this.props.match.params.id);
  }

  render() {
    const { tactics, fetching, activeTacticId } = this.props;
    return (
      <Paper zDepth={3}>
        <TacticList
          tactics={tactics}
          activeTacticId={activeTacticId}
          fetching={fetching}
          onSelectTactic={(event, id) => this.props.selectTactic(id)}
        />
      </Paper>
    );
  }
}

TacticListContainer.propTypes = {
  tactics: PropTypes.arrayOf(pt.tactic).isRequired,
  selectTactic: PropTypes.func.isRequired,
  fetchTactics: PropTypes.func.isRequired,
  activeTacticId: PropTypes.number.isRequired,
  fetching: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  tactics: selectTacticsArray(state),
  activeTacticId: selectActiveTacticId(state),
  fetching: selectIsFetching(state),
});

const mapDispatchToProps = {
  selectTactic,
  fetchTactics,
};

export default connect(mapStateToProps, mapDispatchToProps)(TacticListContainer);
