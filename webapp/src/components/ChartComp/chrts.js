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

      //console.log(typeof idd, idd[0]);
      
      this.state = {
        holder: '',
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

    let urler = '';
    if(this.props.postType != "" || this.props.postType ==  "allcars") {
        urler = 'http://localhost:8081/app_usages'+ "/'"+ this.props.postType + "'";
        this.setState({holder: this.props.postType})
    } else {
        urler = 'http://localhost:8081/app_usages';
    }
    //console.log(urler);
    idd = [];
    uses = [];
    const response = await axios.get(urler);
    const events = response.data;
    this.setState({events: response.data});
    this.state.events.map(event => {
      uses.push(event.uses);
      idd.push(event.vehicle_name +  " -- " + event.application_name);
    });

    this.setState({options: {
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: idd
      }
    }});

    this.setState({series: [{
      name: 'series-1',
      data: uses
    }]});
    
    
  } 
  
    render() {
      if(this.props.postType != this.state.holder) {
        this.componentDidMount();
        this.setState({holder: this.props.postType})
        //console.log(this.state.options.xaxis.categories);
      }

      return (
        <div className="bill">
            <Chart options={this.state.options} series={this.state.series} type="bar" width={1200} height={600} />
        </div>
      );
    }
  }

export default Charter;
