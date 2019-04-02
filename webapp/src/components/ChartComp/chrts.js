import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import './charter.css'
class Charter extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        options: {
          chart: {
            id: 'apexchart-example'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [{
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }]
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