import React, { Component } from 'react';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTactics } from '../actions/tactics';

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

  render() {
    return (
      <SelectableList
        value={this.state.selectedIndex}
        onChange={this.handleRequestChange}
      >
        <RaisedButton fullWidth label="New Tactic" />
        <ListItem
          value={1}
          primaryText="Item 1"
        />
        <ListItem
          value={2}
          primaryText="Item 2"
        />
        <ListItem
          value={3}
          primaryText="Item 3"
        />
      </SelectableList>
    );
  }
}

TacticList.propTypes = {
  fetchTactics: PropTypes.func.isRequired,
};

export default connect(null, { fetchTactics })(TacticList);
