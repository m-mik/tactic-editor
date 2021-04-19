import { connect } from 'react-redux';

import MatchSummary from '../../components/MatchSummary';
import { makeSelectMatchSummary, makeSelectOptions } from '../../data/tacticDetails/selectors';

const makeMapStateToProps = () => {
  const selectMatchSummary = makeSelectMatchSummary();
  const selectOptions = makeSelectOptions();
  return state => ({
    summary: selectMatchSummary(state),
    options: selectOptions(state),
  });
};

const mapDispatchToProps = {};

export default connect(makeMapStateToProps, mapDispatchToProps)(MatchSummary);
