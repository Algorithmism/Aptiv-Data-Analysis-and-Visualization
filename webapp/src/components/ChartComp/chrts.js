import React from 'react';
import Chart from 'react-apexcharts'
import './charter.css'
import axios from 'axios';

var idd = [];
var uses = [];
var eventer;

class Charter extends React.Component {

 constructor(props) { 
      super(props);
   
      this.state = {
        options: {
          chart: {
            id: 'apexchart-example'
          },
          xaxis: {
            categories: idd
          }
        },
        series: [{
          name: 'series-1',
          data: uses
        }],
        events: []
      }
    }
  
  async componentDidMount() {
    const response = await axios.get('http://localhost:8081/app_usages');
    const events = response.data;
    this.setState({events: response.data},
    this.state.events.map(event => {
      uses.push(event.uses);
      idd.push(event.vehicle_name +  " -- " + event.application_name);
    }));
  } 
  
    render() {
      return (
        <div className="bill">
            <Chart options={this.state.options} series={this.state.series} type="bar" width={1000} height={320} />
        </div>
      );
    }
  }

export default Charter;
