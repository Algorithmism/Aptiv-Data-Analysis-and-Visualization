import React, { Component } from 'react';
//import SkeletonVList from './components/SkeletonVList.js';
import Collap from './components/collapslist';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="apper">
        <Collap />
        <Collap />
      </div>
    );
  }
}

export default App;
