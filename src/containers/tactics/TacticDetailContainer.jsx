import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TacticDetailContainer extends Component {
  render() {
    return (
      <section className="tactic-panel">
          {/*<TacticEditor tacticId={this.props.selectedTacticId} />*/}
      </section>
    );
  }
}

const mapStateToProps = ({ ui }) => (
  { selectedTacticId: ui.selectedTacticId }
);

TacticDetailContainer.propTypes = {
  selectedTacticId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(TacticDetailContainer);
