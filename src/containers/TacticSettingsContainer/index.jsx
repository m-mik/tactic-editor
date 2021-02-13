import { connect } from 'react-redux';

import TacticSettings from '../../components/TacticSettings';
import { makeSelectTactic } from '../../data/tactics/selectors';
import { updateTactic } from '../../data/tactics/actions';

const makeMapStateToProps = () => {
  const selectTactic = makeSelectTactic();
  return state => ({
    tactic: selectTactic(state),
  });
};

const mapDispatchToProps = {
  onSettingChange: updateTactic,
};

export default connect(makeMapStateToProps, mapDispatchToProps)(TacticSettings);
