import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import './charter.css'
import axios from 'axios';

var idd = [];
var uses = [];
var eventer;




class Charter extends Component {


    /*
  eventer.map(event => {
      uses.push(event.uses);
      idd.push(event.vehicle_name +  " -- " + event.application_name);
  });
    */



  state = {
    events: []
  }


  componentDidMount() {
    axios.get('http://localhost:8081/app_usages').then(response => {
      //console.log(response);
      const events = response.data;
      this.setState({events})
    })
    this.state.events.map(event => {
      uses.push(event.uses);
      idd.push(event.vehicle_name +  " -- " + event.application_name);
  })

  }


    

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


      }
    }
    render() {
      return (
        <div className="bill">
            <Chart options={this.state.options} series={this.state.series} type="bar" width={1000} height={320} />
        </div>
      )
    }
  }


  export default Charter;