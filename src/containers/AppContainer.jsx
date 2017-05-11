import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as tacticActions from '../actions/tactics';

class AppContainer extends Component {
  componentDidUpdate() {
    const { redirect, resetRedirect } = this.props;
    if (redirect) resetRedirect();
  }

  render() {
    const { children, redirect } = this.props;
    return (
      <div className="container">
        {redirect && <Redirect to={redirect} />}
        {children}
      </div>
    );
  }
}

AppContainer.defaultProps = {
  children: null,
};

AppContainer.propTypes = {
  resetRedirect: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
  children: PropTypes.node,
};

const mapStateToProps = state => ({
  redirect: state.ui.redirect,
});

const ConnectedAppContainer = connect(
  mapStateToProps,
  tacticActions,
)(AppContainer);

export default withRouter(ConnectedAppContainer);
