import React from 'react';
import Chart from 'react-apexcharts'
import './charter.css'
import axios from 'axios';

class Candler extends React.Component {
      
    constructor(props) {
      super(props);

      this.state = {
        options: {
          title: {
            text: 'CandleStick Chart',
            align: 'center'
          },
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        },
        series: [{
          data: [{
            x: new Date(1538778600000),
            y: [6629, 6650.5, 6623.04, 6629]
          },
          {
            x: new Date(1538780400000),
            y: [6632.01, 6643.59, 6620, 6630.11]
          },
          {
            x: new Date(1538782200000),
            y: [6630.71, 6648.95, 6648.34, 6635.65]
          },
          {
            x: new Date(1538784000000),
            y: [6635.65, 6651, 6629.67, 6638.24]
          },
          {
            x: new Date(1538785800000),
            y: [6638.24, 6640, 6620, 6624.47]
          },
          {
            x: new Date(1538787600000),
            y: [6624.53, 6636.03, 6621.68, 6624.31]
          },
          {
            x: new Date(1538789400000),
            y: [6624.61, 6632.2, 6617, 6626.02]
          },
          {
            x: new Date(1538791200000),
            y: [6627, 6627.62, 6584.22, 6603.02]
          },
          {
            x: new Date(1538793000000),
            y: [6605, 6608.03, 6598.95, 6604.01]
          },
          {
            x: new Date(1538794800000),
            y: [6604.5, 6614.4, 6602.26, 6608.02]
          },
          {
            x: new Date(1538796600000),
            y: [6608.02, 6610.68, 6601.99, 6608.91]
          },
          {
            x: new Date(1538798400000),
            y: [6608.91, 6618.99, 6608.01, 6612]
          },
          {
            x: new Date(1538800200000),
            y: [6612, 6615.13, 6605.09, 6612]
          },
          {
            x: new Date(1538802000000),
            y: [6612, 6624.12, 6608.43, 6622.95]
          },
          {
            x: new Date(1538803800000),
            y: [6623.91, 6623.91, 6615, 6615.67]
          },
          {
            x: new Date(1538805600000),
            y: [6618.69, 6618.74, 6610, 6610.4]
          },
          {
            x: new Date(1538807400000),
            y: [6611, 6622.78, 6610.4, 6614.9]
          },
          {
            x: new Date(1538809200000),
            y: [6614.9, 6626.2, 6613.33, 6623.45]
          },
          {
            x: new Date(1538811000000),
            y: [6623.48, 6627, 6618.38, 6620.35]
          },
          {
            x: new Date(1538812800000),
            y: [6619.43, 6620.35, 6610.05, 6615.53]
          }]
        }],
      }
    }

    
 async componentDidMount() {
        let urler = '';

        let maxer = [];
        let miner = [];
        let names = [];
        let avrs = [];
        let stder = [];

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
            maxer.push(event.max_time);
            miner.push(event.min_time);
            names.push(event.application_name);
            avrs.push(event.avg_time);
            stder.push(event.std_dev);
        });


        for (let i = 0; i < maxer.length; i++) {

          if (maxer[i].hasOwnProperty("minutes")) {
            if (maxer[i].hasOwnProperty("seconds")) {
              maxer[i] = (maxer[i].minutes) * (60) + maxer[i].seconds;
            } else {
              maxer[i] = (maxer[i].minutes) * (60)
            }
          } else {
              maxer[i] = maxer[i].seconds;
          }

          if (miner[i].hasOwnProperty("minutes")) {
            if (miner[i].hasOwnProperty("seconds")) {
              miner[i] = (miner[i].minutes) * (60) + miner[i].seconds;
            } else {
              miner[i] = (miner[i].minutes) * (60)
            }
          } else {
            miner[i] = miner[i].seconds;
          }

          if (avrs[i].hasOwnProperty("seconds")) {
            if (avrs[i].hasOwnProperty("milliseconds")) {
              avrs[i] = (avrs[i].seconds) + avrs[i].milliseconds/1000;
            } else {
              avrs[i] = (avrs[i].seconds);
            }
          } else {
            avrs[i] = avrs[i].milliseconds/1000;
          }

          try {
            if (stder[i].hasOwnProperty("seconds")) {
              if (stder[i].hasOwnProperty("milliseconds")) {
                stder[i] = (stder[i].seconds) + stder[i].milliseconds/1000;
              } else {
                stder[i] = (stder[i].seconds);
              }
            } else {
              stder[i] = stder[i].milliseconds/1000;
            }
          } catch {
            
          }
      }
      console.log(stder);

      }

    render() {
      return ( 

        <div  className="bill">
          <Chart options={this.state.options} series={this.state.series} type="candlestick" height="1000"  width={1200}/>
        </div>

      );
    }
  }

  export default Candler;