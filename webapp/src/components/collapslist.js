import React, { Component } from 'react'
import Collapsible from 'react-collapsible';
import './collaplist.css';
 
class Collap extends Component {
 
  render(){
    return(
 
        <Collapsible trigger="Start here">
            <p>This is the collapsible content. It can be any element or React component you like.</p>
            <p>It can even be another Collapsible component. Check out the next section!</p>
            <Collapsible trigger="oh shit">
                <p>This is the collapsible content. It can be any element or React component you like.</p>
                <p>It can even be another Collapsible component. Check out the next section!</p>
            </Collapsible>
        </Collapsible>
 
    );
  }
 
}
 
export default Collap;