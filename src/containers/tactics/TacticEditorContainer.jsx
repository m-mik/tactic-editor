import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';

class TacticEditorContainer extends Component {
  render() {
    return (
      <section className="tactic-panel">
        <Paper zDepth={2}>
          {/*<TacticEditor tacticId={this.props.selectedTacticId} />*/}
        </Paper>
      </section>
    );
  }
}

const mapStateToProps = ({ ui }) => (
  { selectedTacticId: ui.selectedTacticId }
);

TacticEditorContainer.propTypes = {
  selectedTacticId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(TacticEditorContainer);
