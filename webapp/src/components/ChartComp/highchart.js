import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios';

var maxer = [];
var miner = [];
var names = [];
class BarAverage extends React.Component {

    constructor(props) { 
        super(props);


        this.state = {
            options: {
                chart: {
                    renderTo: 'container',
                    type: 'bar',
                    width: "1000"
                },
                title: {
                    text: 'Height Versus Weight of 507 Individuals by Gender'
                },
                subtitle: {
                    text: 'Source: Heinz  2003'
                },
                xAxis: {
                    categories: []
                },
                series: [ {
                    name: 'max',
                    stacking: true,
                    color: 'red',
                    data: []
                }, {
                    name: 'min',
                    stacking: true,
                    color: 'blue',
                    data: []
                }, {
                    type: 'scatter',
                    name: 'avg',
                    color: 'black',
                    data: [0,0,0,0,0,0]
                }]
            }
        }
    }
    async componentDidMount() {
        const response = await axios.get('http://localhost:8081/app_usages');
        const events = response.data;
        this.setState({events: response.data});
        this.state.events.map(event => {
          maxer.push(event.max_time);
          miner.push(event.min_time);
          names.push([event.application_name]);
        });
    
        

        for (var i = 0; i < maxer.length; i++) {
            
            if(maxer[i].hasOwnProperty("minutes"))
            {  
                maxer[i] = (maxer[i].minutes)*(60)+maxer[i].seconds;
            } else {
                maxer[i] = maxer[i].seconds;
            }

            if(miner[i].hasOwnProperty("minutes"))
            {  
                miner[i] = [(miner[i].minutes)*(60)+miner[i].seconds];
            } else {
                miner[i] = [miner[i].seconds];
            }
        }
      } 

    render() {
        return (
            <div id="biller">
                <HighchartsReact highcharts={Highcharts} options={this.state.options}  />
            </div>
        );
    }
}


export default BarAverage;