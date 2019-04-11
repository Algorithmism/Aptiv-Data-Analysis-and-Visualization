import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios';


class Bill extends React.Component {

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
                    categories: ['f1', 'f2', 'f3']
                },
                series: [ {
                    name: 'max',
                    stacking: true,
                    color: 'red',
                    data: [
                        [100],
                        [120],
                        [50]
                    ]
                }, {
                    name: 'min',
                    stacking: true,
                    color: 'blue',
                    data: [
                        [13],
                        [50],
                        [1]
                    ]
                }, {
                    type: 'scatter',
                    name: 'avg',
                    color: 'black',
                    data: [
                        [44],
                        [55],
                        [12]
                    ]
                }]
            }
        }
    }
    async componentDidMount() {
        const response = await axios.get('http://localhost:8081/app_usages');
        const events = response.data;
        this.setState({events: response.data});
        this.state.events.map(event => {
          //uses.push(event.uses);
          //idd.push(event.vehicle_name +  " -- " + event.application_name);
        });
      } 

    render() {
        return (
            <div id="biller">
                <HighchartsReact highcharts={Highcharts} options={this.state.options}  />
            </div>
        );
    }
}


export default Bill;