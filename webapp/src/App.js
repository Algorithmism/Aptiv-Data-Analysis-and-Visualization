import React, { Component } from 'react';
import SkeletonVList from './components/SkeletonVList.js';
//import Collap from './components/CollapsibleComp/collapslist';
//import AccList from './components/CollapsibleComp/dynamicdropdown';
import SearchApp from './components/SearchComp/index.js';
import Charter from './components/ChartComp/chrts';
import ReactVirtualizedTable from './components/GoogleComp/virtualTabler';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="apper">
        <SearchApp />
      </div>
    );
  }
}

export default App;
