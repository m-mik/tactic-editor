import React, { Component } from 'react';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

const SelectableList = makeSelectable(List);

export default class TacticList extends Component {
  componentDidMount() {
    this.props.onFetchTacticsRequest();
  }

  render() {
    const {
      fetching,
      selectedTacticId,
      onSelectTactic,
    } = this.props;

    const renderTactics = () => this.props.tactics.map(tactic =>
      <ListItem
        key={tactic.id}
        value={tactic.id}
        primaryText={tactic.name}
        containerElement={<Link to={`/tactics/${tactic.id}`} />}
      />,
    );

    return (
      <div>
        <SelectableList
          value={selectedTacticId}
          onChange={onSelectTactic}
        >
          {fetching && <Loading />}
          {renderTactics()}
        </SelectableList>
      </div>
    );
  }
}

TacticList.defaultProps = {
  fetching: false,
  tactics: [],
  selectedTacticId: 0,
  onFetchTacticsRequest: () => {},
  onSelectTactic: () => {},
};

TacticList.propTypes = {
  tactics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
  fetching: PropTypes.bool,
  selectedTacticId: PropTypes.number,
  onFetchTacticsRequest: PropTypes.func,
  onSelectTactic: PropTypes.func,
};
