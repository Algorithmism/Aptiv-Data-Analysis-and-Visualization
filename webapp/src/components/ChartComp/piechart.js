import React from 'react';
import Chart from 'react-apexcharts'
import './charter.css'
import axios from 'axios';


class PieCharter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          holder : '',
          options: {
            labels: [],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
          series: [],
        }       
      }


      async componentDidMount() {
        let urler = '';
        let timer = [];
        let namers = [];
        if(this.props.postType != "" || this.props.postType ==  "allcars") {
            urler = 'http://localhost:8081/app_usages'+ "/'"+ this.props.postType + "'";
            this.setState({holder: this.props.postType})
        } else {
            urler = 'http://localhost:8081/app_usages';
        }
        const response = await axios.get(urler);
        this.setState({events: response.data});
        //console.log(response);
        this.state.events.map(event => {
          timer.push(event.total_time);
          namers.push(event.application_name);
        });
        
        for (let i = 0; i < timer.length; i++) {

          if (timer[i].hasOwnProperty("minutes")) {
            if(timer[i].hasOwnProperty("seconds")) {
              timer[i] = (timer[i].minutes) * (60) + timer[i].seconds;
            } else {
              timer[i] = (timer[i].minutes) * (60);
            }
          } else {
            timer[i] = timer[i].seconds;
          }
        }

        timer.sort();
        //console.log(timer);
        if(timer.length != 0) {
        this.setState({series : [timer[0], timer[10],timer[20],timer[28],timer[32],timer[39]] });
        this.setState({ options: {
          labels: [namers[0],namers[10],namers[20],namers[28],namers[32],namers[39]],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }});
      } else {
        this.setState({series : [0,0] });
        this.setState({ options: {
          labels: [0,0],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }});
      }
        
      }

      render() {
        if(this.props.postType != this.state.holder) {
          this.componentDidMount();
          this.setState({holder: this.props.postType})
  
        }

        return (
          <div id="chart">
            <Chart options={this.state.options} series={this.state.series} type="pie" width="600" />
            
          </div>
  

        );
      }
  }

export default PieCharter;
