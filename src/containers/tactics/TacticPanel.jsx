import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import TacticEditor from './TacticEditor';

const style = {
  margin: 30,
  textAlign: 'center',
  height: 800,
};

const TacticPanel = props => (
  <section className="tactic-panel">
    <Paper style={style} zDepth={2}>
      <TacticEditor tacticId={props.selectedTacticId} />
    </Paper>
  </section>
);

const mapStateToProps = ({ ui }) => (
  { selectedTacticId: ui.selectedTacticId }
);

TacticPanel.propTypes = {
  selectedTacticId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(TacticPanel);
