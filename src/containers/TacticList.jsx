import React, { Component } from 'react';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTactics } from '../actions/tactics';
import { tacticsSelector } from '../selectors/tactics';
import Loading from '../components/Loading';

const SelectableList = makeSelectable(List);

class TacticList extends Component {
  constructor() {
    super();

    this.state = {
      selectedIndex: 1,
    };

    this.handleRequestChange = this.handleRequestChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchTactics();
  }

  handleRequestChange(event, index) {
    this.setState({ selectedIndex: index });
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
          value={this.state.selectedIndex}
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
  tactics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { tactics } = state.entities;
  return {
    tactics: tacticsSelector(state),
    isFetching: tactics.isFetching,
  };
};

export default connect(mapStateToProps, { fetchTactics })(TacticList);
