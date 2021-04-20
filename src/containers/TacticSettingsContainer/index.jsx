import { connect } from 'react-redux';

import TacticSettings from '../../components/TacticSettings';
import { saveTactic, updateTactic } from '../../data/tactics/actions';
import { makeSelectFullTacticDetail } from '../../data/tacticDetails/selectors';

const makeMapStateToProps = () => {
  const selectFullTacticDetail = makeSelectFullTacticDetail();
  return state => ({
    tactic: selectFullTacticDetail(state),
  });
};

const mapDispatchToProps = {
  onSettingChange: updateTactic,
  onTacticSave: saveTactic,
};

export default connect(makeMapStateToProps, mapDispatchToProps)(TacticSettings);
