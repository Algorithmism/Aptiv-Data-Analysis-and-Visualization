import React, { Component } from 'react';
import SkeletonVList from './components/SkeletonVList.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="apper">
        <SkeletonVList />
      </div>
    );
  }
}

export default App;
