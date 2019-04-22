import React from 'react';
import Chart from 'react-apexcharts'
import axios from 'axios';

class LineChart extends React.Component {
    
    constructor(props) {
      super(props);

      this.state = {
        holder: '',
        options: {
          chart: {
            shadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 1
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#77B6EA', '#545454'],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Average High & Low Temperature',
            align: 'left'
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
            
            size: 6
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
              text: 'Month'
            }
          },
          yaxis: {
            title: {
              text: 'Temperature'
            },
            min: 0,
            max: 40
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
          }
        },
        series: [
          {
            name: "Average",
            data: []
          }
        ],
      }
    }


    async componentDidMount() {
      let urler = '';
      if(this.props.postType != "" ) {
        if(this.props.postType !=  "allcars")
        {
          urler = 'http://localhost:8081/app_usages'+ "/'"+ this.props.postType + "'";
          this.setState({holder: this.props.postType});
        } else {
          urler = 'http://localhost:8081/app_usages';
        }
      } else {
          urler = 'http://localhost:8081/app_usages';
      }
     
      const response = await axios.get(urler);
      const events = response.data;
      const maxer = [];
      const miner = [];
      const names = [];
      const avrs = [];

      events.forEach(event => {
          maxer.push(event.max_time);
          miner.push(event.min_time);
          names.push(event.application_name);
          avrs.push(event.avg_time);
      });

      for (let i = 0; i < maxer.length; i++) {

          if (maxer[i].hasOwnProperty("minutes")) {
              maxer[i] = (maxer[i].minutes) * (60) + maxer[i].seconds;
          } else {
              maxer[i] = maxer[i].seconds;
          }

          if (miner[i].hasOwnProperty("minutes")) {
              miner[i] = (miner[i].minutes) * (60) + miner[i].seconds;
          } else {
              miner[i] = miner[i].seconds;
          }

          if (avrs[i].hasOwnProperty("milliseconds")) {
              avrs[i] = (avrs[i].milliseconds)/1000 + avrs[i].seconds;
          } else {
              avrs[i] = avrs[i].seconds;
          }
      }


      this.setState({ series: [
        {
          name: "Average",
          data: avrs
        }
      ]});

      this.setState({        options: {
        chart: {
          shadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Average High & Low Temperature',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          
          size: 6
        },
        xaxis: {
          categories: names,
          title: {
            text: 'Month'
          }
        },
        yaxis: {
          title: {
            text: 'Temperature'
          },
          min: 0,
          max: 40
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      }})
  }




    render() {
      if(this.props.postType != this.state.holder) {
        this.componentDidMount();
        this.setState({holder: this.props.postType})
      }

      return (
          <div id="chart">
            <Chart options={this.state.options} series={this.state.series} type="line" height="600" width="900" />
          </div>
      );
    }
  }

  export default LineChart;