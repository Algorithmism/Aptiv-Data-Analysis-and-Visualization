import React from 'react';
import Chart from 'react-apexcharts'
import './charter.css'
import axios from 'axios';

class Candler extends React.Component {
      
    constructor(props) {
      super(props);

      this.state = {
        holder: '',
        options: {
          title: {
            text: 'CandleStick Chart',
            align: 'center'
          },
          xaxis: {
            min: 0,
            max: 10
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        },
        series: [{
          data: [{
            x: 1,
            y: [6629, 6650.5, 6623.04, 6629]
          },
          {
            x: 2,
            y: [6632.01, 6643.59, 6620, 6630.11]
          },
          {
            x: 3,
            y: [6630.71, 6648.95, 6648.34, 6635.65]
          },
          {
            x: 4,
            y: [6635.65, 6651, 6629.67, 6638.24]
          },
          {
            x: 5,
            y: [6638.24, 6640, 6620, 6624.47]
          },
          {
            x: 6,
            y: [6624.53, 6636.03, 6621.68, 6624.31]
          },
          {
            x: 7,
            y: [6624.61, 6632.2, 6617, 6626.02]
          },
          {
            x: 8,
            y: [6627, 6627.62, 6584.22, 6603.02]
          }]
        }],
      }
    }

    /*
    [{
            x: new Date(1538778600000),
            y: [6629, 6650.5, 6623.04, 6629]
          }]
    */
    
 async componentDidMount() {
        let urler = '';

        let maxer = [];
        let miner = [];
        let names = [];
        let avrs = [];
        let stder = [];

        if(this.props.postType != "" && this.props.postType !=  "allcars") {
            urler = 'http://localhost:8081/app_usages'+ "/'"+ this.props.postType + "'";
            this.setState({holder: this.props.postType})
        } else {
            urler = 'http://localhost:8081/app_usages';
        }
        const response = await axios.get(urler);
        this.setState({events: response.data});
       //console.log(urler);

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

          if (avrs[i].hasOwnProperty("minutes")) {
            if (avrs[i].hasOwnProperty("seconds")) {
              avrs[i] = (avrs[i].minutes)*60 + avrs[i].seconds;
            } else {
              avrs[i] = (avrs[i].minutes);
            }
          } else {
            avrs[i] = avrs[i].seconds;
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
        //console.log(maxer);
        //console.log(avrs);
        let hold_vals = [];

        for(let i = 0; i < maxer.length; i++) 
        {
          if(stder[i] == null) {
            hold_vals.push({x: i+1, y: [avrs[i],maxer[i],miner[i],avrs[i]]});
          } else {
            hold_vals.push({x: i+1, y: [avrs[i]+stder[i]/4,maxer[i],miner[i],avrs[i]-stder[i]/4]});
          }
        }

        this.setState({
          series: [{
            data: hold_vals
          }]
        })

        this.setState({options: {
          title: {
            text: 'CandleStick Chart',
            align: 'center'
          },
          xaxis: {
            min: 0,
            max: hold_vals.length
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        }})
      }

      

    render() {

      if(this.props.postType != this.state.holder) {
        this.componentDidMount();
        this.setState({holder: this.props.postType})
      }


      return ( 
        <div  className="bill">
          <Chart options={this.state.options} series={this.state.series} type="candlestick" height="700"  width={1000}/>
        </div>

      );
    }
  }

  export default Candler;