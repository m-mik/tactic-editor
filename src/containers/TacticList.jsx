import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { RaisedButton } from 'material-ui';
import PropTypes from 'prop-types';
import { fetchTactics, selectTactic } from '../actions/tactics';
import { tacticsSelector } from '../selectors/tactics';
import Loading from '../components/Loading';

const SelectableList = makeSelectable(List);

class TacticList extends Component {
  constructor() {
    super();

    this.handleRequestChange = this.handleRequestChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchTactics();
  }

  handleRequestChange(event, index) {
    this.props.selectTactic(index);
  }

  renderTactics() {
    return this.props.tactics.map(tactic =>
      <ListItem value={tactic.id} primaryText={tactic.name} key={tactic.id} />,
    );
  }

  render() {
    const { isFetching } = this.props;

    return (
      <div>
        <RaisedButton fullWidth label="New Tactic" />
        <SelectableList
          value={this.props.selectedTacticId}
          onChange={this.handleRequestChange}
        >
          {isFetching && <Loading />}
          {this.renderTactics()}
        </SelectableList>
      </div>
    );
  }
}

TacticList.propTypes = {
  fetchTactics: PropTypes.func.isRequired,
  selectTactic: PropTypes.func.isRequired,
  tactics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isFetching: PropTypes.bool.isRequired,
  selectedTacticId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const { entities: { tactics }, ui } = state;
  return {
    tactics: tacticsSelector(state),
    isFetching: tactics.status.isFetching,
    selectedTacticId: ui.selectedTacticId,
  };
};

export default connect(mapStateToProps, { fetchTactics, selectTactic })(TacticList);
