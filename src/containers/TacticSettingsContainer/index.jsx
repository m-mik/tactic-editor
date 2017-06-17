import { connect } from 'react-redux';

import TacticSettings from '../../components/TacticSettings';
import { updateTactic } from '../../data/tactics/actions';
import { makeSelectFullTacticDetail } from '../../data/tacticDetails/selectors';

const makeMapStateToProps = () => {
  const selectFullTacticDetail = makeSelectFullTacticDetail();
  return state => ({
    tactic: selectFullTacticDetail(state),
  });
};

const mapDispatchToProps = {
  onSettingChange: updateTactic,
};

export default connect(makeMapStateToProps, mapDispatchToProps)(TacticSettings);
