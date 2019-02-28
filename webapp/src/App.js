import React, { Component } from 'react';
//import SkeletonVList from './components/SkeletonVList.js';
//import Collap from './components/collapslist';
import AccList from './components/dynamicdropdown';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="apper">
        <AccList />
      </div>
    );
  }
}

export default App;
