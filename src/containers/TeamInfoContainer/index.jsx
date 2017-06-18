import { connect } from 'react-redux';

import TeamInfo from '../../components/TeamInfo';

const makeMapStateToProps = () => {
  const selectOptions = makeSelectOptions();
  return (state, ownProps) => ({
    options: selectOptions(state),
  });
};

export default connect(makeMapStateToProps)(TeamInfo);
