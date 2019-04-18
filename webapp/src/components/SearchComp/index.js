import 'antd/dist/antd.css'
import './styles.css'
import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'
import lodash from 'lodash'
import { Icon } from 'antd'
import data from './data'
import Header from './Header'
import { Grid, Slug, Fade } from 'mauerwerk'
import AccList from '../CollapsibleComp/dynamicdropdown.js';
import Tabler from '../GoogleComp/Tabler';
import TableUsage from '../GoogleComp/table_app_usage';
import All_Vehicles from '../GoogleComp/All_Vehicles';
import Charter from '../ChartComp/chrts';
import ReactVirtualizedTable from '../GoogleComp/virtualTabler';
import Candler from '../ChartComp/candlestick';
import BarAverage from '../ChartComp/highchart';
import RangeBar from '../ChartComp/rangebar';
import PieCharter from '../ChartComp/piechart';

import axios from 'axios';
//import pgtabler from '../GoogleComp/pageTabler';

var namer = [];
var counter = 0;
const Cell = ({ toggle, name, height, description, css, maximized, holder }) => (
  <div
    className="cell"
    style={{ backgroundImage: css, cursor: !maximized ? 'pointer' : 'auto' }}
    onClick={!maximized ? toggle : undefined}>

    <Fade show={maximized} delay={maximized ? 400 : 0}>
 
      


      <div className="details">
        <Slug delay={600}>

          <div className="close">
            <Icon type="close" style={{ cursor: 'pointer' }} onClick={toggle} />
          </div>
          <h1>{name}</h1>
          <p>{description}</p>
        </Slug>
      </div>
    </Fade>
    { name == "Timeline of Events" &&
        <Tabler />
      }
    { name == "Combined App Usage Across Cars" &&
        <TableUsage />
    }
    { name == "App State Changes" &&
        <BarAverage postType={holder}/>
    }
    { name == "App Usage" &&
        <Charter />
    }
    { name == "Individual Vehcile App Usage" &&
        <PieCharter />
        
    }
    { name.toLowerCase() == "all active cars in system" &&
        <Candler />
    }
    <Fade
    
      show={!maximized}
      from={{ opacity: 0, transform: 'translate3d(0,140px,0)' }}
      enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
      leave={{ opacity: 0, transform: 'translate3d(0,-50px,0)' }}
      delay={maximized ? 0 : 400}>
      <div className="default">{name}</div>

    </Fade>
  </div>
)
//
class SearchComp extends Component {


  constructor() {
    super();
    
    this.state = {
      data, 
      columns: 2, 
      margin: 50, 
      filter: '', 
      height: false,
      curvech: '',
      showMenu: false
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get('http://localhost:8081/vehicles');
    const events = response.data;
    this.setState({events: response.data});
    this.state.events.map(event => {
      namer.push(event.name);
    });
    
  } 

  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  handleRegionClick(nmn) {
    this.setState({curvech: nmn});
    //window.location.reload();
    
  }

  
  state = { data, columns: 2, margin: 50, filter: '', height: false }
  search = e => this.setState({ filter: e.target.value })
  shuffle = () => this.setState(state => ({ data: lodash.shuffle(state.data) }))
  setColumns = e => this.setState({ columns: parseInt(e.key) })
  setMargin = e => this.setState({ margin: parseInt(e.key) })
  setHeight = e => this.setState({ height: e })
  render() {
    const data = this.state.data.filter(
      d => d.name.toLowerCase().indexOf(this.state.filter) != -1
    )
    return (
      <div className="main">
        <Header
          {...this.state}
          search={this.search}
          shuffle={this.shuffle}
          setColumns={this.setColumns}
          setMargin={this.setMargin}
          setHeight={this.setHeight}
          
        />
              <div className= "dropper">
        <button onClick={this.showMenu}>
          Vehicles
        </button>
        
        {
          this.state.showMenu
            ? (
              <div className="menu">
              {this.state.events.map(event =>
                <button key={event.name} onClick={() => this.handleRegionClick(event.name)}> {event.name} </button>
              )}
              <button> All Vehicles </button>
              </div>
            )
            : (
              null
            )
        }
      </div>
        <Grid
          className="grid"
          // Arbitrary data, should contain keys, possibly heights, etc.
          data={data}
          // Key accessor, instructs grid on how to fet individual keys from the data set
          keys={d => d.name}
          // Can be a fixed value or an individual data accessor
          heights={this.state.height ? d => d.height : 200}
          // Number of columns
          columns={this.state.columns}
          // Space between elements
          margin={this.state.margin}
          // Removes the possibility to scroll away from a maximized element
          lockScroll={true}
          // Delay when active elements (blown up) are minimized again
          closeDelay={400}>
          {(data, maximized, toggle) => (
            <Cell {...data} maximized={maximized} toggle={toggle} holder={this.state.curvech} />
          )}
        </Grid>
      </div>
    )
  }
}

export default SearchComp;
