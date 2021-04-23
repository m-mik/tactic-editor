import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import DoneIcon from 'material-ui/svg-icons/action/done';
import SaveIcon from 'material-ui/svg-icons/content/save';

import LoadingIndicator from '../LoadingIndicator';
import CreateTacticContainer from '../../containers/CreateTacticContainer';
import styles from './TacticList.scss';
import pt from '../../propTypes';

const SelectableList = makeSelectable(List);

const TacticList = (props) => {
  const { unsavedTacticIds } = props;
  return (
    <div>
      <CreateTacticContainer />
      <SelectableList
        value={props.activeTacticId}
        onChange={props.onSelectTactic}
        className={styles.list}
      >
        {props.fetching && <LoadingIndicator />}
        {props.tactics.map(tactic =>
          <ListItem
            key={tactic.id}
            value={tactic.id}
            primaryText={tactic.name}
            rightIcon={unsavedTacticIds.has(tactic.id)
              ? <SaveIcon color="#403f3f" />
              : <DoneIcon color="green" />
            }
          />)}
      </SelectableList>
    </div>
  );
};

TacticList.propTypes = {
  tactics: pt.tactics.isRequired,
  unsavedTacticIds: pt.unsavedTacticIds.isRequired,
  fetching: PropTypes.bool.isRequired,
  activeTacticId: PropTypes.number.isRequired,
  onSelectTactic: PropTypes.func.isRequired,
};

export default TacticList;
