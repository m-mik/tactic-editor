import React from 'react';

import SideBar from './SideBar';
import Main from './Main';
import TacticList from '../containers/tactics/TacticList';

const App = () => (
  <div className="container">
    <SideBar>
      <TacticList />
    </SideBar>
    <Main />
  </div>
);

export default App;
