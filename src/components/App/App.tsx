import React, { PureComponent } from 'react';

import { WorkloadListContainer } from '../WorkloadList';
import { WorkloadFormContainer } from '../WorkloadForm';
import './App.css';


class App extends PureComponent {
  render() {
    return (
      <div className="cloudwork">
        <h1>CloudWork</h1>
        <hr />
        <div className="content">
          <div className="form">
            <WorkloadFormContainer />
          </div>
          <div className="list">
            <h2>Workloads</h2>
            <WorkloadListContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
